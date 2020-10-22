const { BN, expectEvent } = require('@openzeppelin/test-helpers');

const HEAD = new BN(0);
const INVALID_TOKEN_ID = new BN(111);

const StructuredLinkedList = artifacts.require('StructuredLinkedListMock');

contract('StructuredLinkedList', function ([owner]) {
  const value = new BN(1);

  beforeEach(async function () {
    this.list = await StructuredLinkedList.new({ from: owner });
  });

  context('when list is empty', function () {
    describe('listExists', function () {
      it('should be false', async function () {
        const exists = await this.list.listExists();
        exists.should.be.equal(false);
      });
    });

    describe('sizeOf', function () {
      it('should be zero', async function () {
        const sizeOf = await this.list.sizeOf();
        sizeOf.should.be.bignumber.equal(new BN(0));
      });
    });

    describe('getNode', function () {
      it('should not exists', async function () {
        const node = await this.list.getNode(1);
        node[0].should.be.equal(false);
        node[1].should.be.bignumber.equal(HEAD);
        node[2].should.be.bignumber.equal(HEAD);
      });
    });
  });

  context('when list is not empty (1 node)', function () {
    let tokenId;

    context('adding a node', function () {
      beforeEach(async function () {
        await this.list.createStructure(value);
        tokenId = await this.list.progressiveId();
        await this.list.insertAfter(HEAD, tokenId);
      });

      describe('listExists', function () {
        it('should be true', async function () {
          const exists = await this.list.listExists();
          exists.should.be.equal(true);
        });
      });

      describe('sizeOf', function () {
        it('should be greater than zero', async function () {
          const sizeOf = await this.list.sizeOf();
          sizeOf.should.be.bignumber.gt(new BN(0));
        });
      });

      describe('nodeExists', function () {
        it('should be true', async function () {
          const nodeExists = await this.list.nodeExists(tokenId);
          nodeExists.should.be.equal(true);
        });
      });

      describe('getNode', function () {
        it('PREV and NEXT should be HEAD', async function () {
          const node = await this.list.getNode(tokenId);
          node[0].should.be.equal(true);
          node[1].should.be.bignumber.equal(HEAD);
          node[2].should.be.bignumber.equal(HEAD);
        });
      });

      describe('getNextNode of not existent node', function () {
        it('should be false', async function () {
          const node = await this.list.getNextNode(INVALID_TOKEN_ID);
          node[0].should.be.equal(false);
          node[1].should.be.bignumber.equal(HEAD);
        });
      });

      describe('getPreviousNode of not existent node', function () {
        it('should be false', async function () {
          const node = await this.list.getPreviousNode(INVALID_TOKEN_ID);
          node[0].should.be.equal(false);
          node[1].should.be.bignumber.equal(HEAD);
        });
      });

      describe('insertAfter of not existent node', function () {
        it('should fail', async function () {
          await this.list.createStructure(value);

          const newTokenId = await this.list.progressiveId();
          const { logs } = await this.list.insertAfter(INVALID_TOKEN_ID, newTokenId);

          expectEvent.inLogs(logs, 'LogNotice', {
            booleanValue: false,
          });

          const node = await this.list.getNode(newTokenId);
          node[0].should.be.equal(false);
          node[1].should.be.bignumber.equal(HEAD);
          node[2].should.be.bignumber.equal(HEAD);
        });
      });

      describe('insertBefore of not existent node', function () {
        it('should fail', async function () {
          await this.list.createStructure(value);

          const newTokenId = await this.list.progressiveId();
          const { logs } = await this.list.insertBefore(INVALID_TOKEN_ID, newTokenId);

          expectEvent.inLogs(logs, 'LogNotice', {
            booleanValue: false,
          });

          const node = await this.list.getNode(newTokenId);
          node[0].should.be.equal(false);
          node[1].should.be.bignumber.equal(HEAD);
          node[2].should.be.bignumber.equal(HEAD);
        });
      });

      describe('remove not existent node', function () {
        it('should fail', async function () {
          const { logs } = await this.list.remove(INVALID_TOKEN_ID);

          expectEvent.inLogs(logs, 'LogNotice', {
            booleanValue: false,
          });
        });
      });

      describe('remove the HEAD node', function () {
        it('should fail', async function () {
          const { logs } = await this.list.remove(HEAD);

          expectEvent.inLogs(logs, 'LogNotice', {
            booleanValue: false,
          });
        });
      });
    });

    context('adding more nodes (not sorted)', function () {
      let firstTokenId;
      let secondTokenId;

      describe('adding after (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          await this.list.createStructure(value);
          tokenId = await this.list.progressiveId();
          await this.list.insertAfter(HEAD, tokenId);

          await this.list.createStructure(value);
          firstTokenId = await this.list.progressiveId();
          await this.list.insertAfter(tokenId, firstTokenId);

          await this.list.createStructure(value);
          secondTokenId = await this.list.progressiveId();
          await this.list.insertAfter(firstTokenId, secondTokenId);

          node = await this.list.getNode(tokenId);
          firstNode = await this.list.getNode(firstTokenId);
          secondNode = await this.list.getNode(secondTokenId);
        });

        it('node PREV should be HEAD', async function () {
          node[1].should.be.bignumber.equal(HEAD);
        });

        it('node NEXT should be firstNode', async function () {
          node[2].should.be.bignumber.equal(firstTokenId);
        });

        it('firstNode PREV should be node', async function () {
          firstNode[1].should.be.bignumber.equal(tokenId);
        });

        it('firstNode NEXT should be secondNode', async function () {
          firstNode[2].should.be.bignumber.equal(secondTokenId);
        });

        it('secondNode PREV should be firstNode', async function () {
          secondNode[1].should.be.bignumber.equal(firstTokenId);
        });

        it('secondNode NEXT should be HEAD', async function () {
          secondNode[2].should.be.bignumber.equal(HEAD);
        });

        context('testing getNextNode', function () {
          describe('using node', function () {
            it('should be firstNode', async function () {
              const retrievedTokenId = await this.list.getNextNode(tokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(tokenId);
              retrievedNode[2].should.be.bignumber.equal(secondTokenId);
            });
          });

          describe('using firstNode', function () {
            it('should be secondNode', async function () {
              const retrievedTokenId = await this.list.getNextNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(firstTokenId);
              retrievedNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('using secondNode', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getNextNode(secondTokenId);
              retrievedTokenId[0].should.be.equal(true);
              retrievedTokenId[1].should.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing getPreviousNode', function () {
          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(tokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(secondTokenId);
              retrievedNode[2].should.be.bignumber.equal(tokenId);
            });
          });

          describe('using firstNode', function () {
            it('should be node', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(HEAD);
              retrievedNode[2].should.be.bignumber.equal(firstTokenId);
            });
          });

          describe('using secondNode', function () {
            it('should be firstNode', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(secondTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(tokenId);
              retrievedNode[2].should.be.bignumber.equal(secondTokenId);
            });
          });
        });

        context('testing remove', function () {
          describe('remove node', function () {
            beforeEach(async function () {
              const { logs } = await this.list.remove(tokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              firstNode = await this.list.getNode(firstTokenId);
              secondNode = await this.list.getNode(secondTokenId);
            });

            it('node should no longer exists', async function () {
              node = await this.list.getNode(tokenId);
              node[0].should.be.equal(false);
              node[1].should.be.bignumber.equal(HEAD);
              node[2].should.be.bignumber.equal(HEAD);
            });

            it('firstNode PREV should be HEAD', async function () {
              firstNode[1].should.be.bignumber.equal(HEAD);
            });

            it('firstNode NEXT should be secondNode', async function () {
              firstNode[2].should.be.bignumber.equal(secondTokenId);
            });

            it('secondNode PREV should be firstNode', async function () {
              secondNode[1].should.be.bignumber.equal(firstTokenId);
            });

            it('secondNode NEXT should be HEAD', async function () {
              secondNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('remove firstNode', function () {
            beforeEach(async function () {
              const { logs } = await this.list.remove(firstTokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(tokenId);
              secondNode = await this.list.getNode(secondTokenId);
            });

            it('firstNode should no longer exists', async function () {
              firstNode = await this.list.getNode(firstTokenId);
              firstNode[0].should.be.equal(false);
              firstNode[1].should.be.bignumber.equal(HEAD);
              firstNode[2].should.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              node[1].should.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be secondNode', async function () {
              node[2].should.be.bignumber.equal(secondTokenId);
            });

            it('secondNode PREV should be node', async function () {
              secondNode[1].should.be.bignumber.equal(tokenId);
            });

            it('secondNode NEXT should be HEAD', async function () {
              secondNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('remove secondNode', function () {
            beforeEach(async function () {
              const { logs } = await this.list.remove(secondTokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(tokenId);
              firstNode = await this.list.getNode(firstTokenId);
            });

            it('secondNode should no longer exists', async function () {
              secondNode = await this.list.getNode(secondTokenId);
              secondNode[0].should.be.equal(false);
              secondNode[1].should.be.bignumber.equal(HEAD);
              secondNode[2].should.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              node[1].should.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be firstNode', async function () {
              node[2].should.be.bignumber.equal(firstTokenId);
            });

            it('firstNode PREV should be node', async function () {
              firstNode[1].should.be.bignumber.equal(tokenId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              firstNode[2].should.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing pop', function () {
          describe('popFront', function () {
            beforeEach(async function () {
              const { logs } = await this.list.popFront();

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              firstNode = await this.list.getNode(firstTokenId);
              secondNode = await this.list.getNode(secondTokenId);
            });

            it('node should no longer exists', async function () {
              node = await this.list.getNode(tokenId);
              node[0].should.be.equal(false);
              node[1].should.be.bignumber.equal(HEAD);
              node[2].should.be.bignumber.equal(HEAD);
            });

            it('firstNode PREV should be HEAD', async function () {
              firstNode[1].should.be.bignumber.equal(HEAD);
            });

            it('firstNode NEXT should be secondNode', async function () {
              firstNode[2].should.be.bignumber.equal(secondTokenId);
            });

            it('secondNode PREV should be firstNode', async function () {
              secondNode[1].should.be.bignumber.equal(firstTokenId);
            });

            it('secondNode NEXT should be HEAD', async function () {
              secondNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('popBack', function () {
            beforeEach(async function () {
              const { logs } = await this.list.popBack();

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(tokenId);
              firstNode = await this.list.getNode(firstTokenId);
            });

            it('secondNode should no longer exists', async function () {
              secondNode = await this.list.getNode(secondTokenId);
              secondNode[0].should.be.equal(false);
              secondNode[1].should.be.bignumber.equal(HEAD);
              secondNode[2].should.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              node[1].should.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be firstNode', async function () {
              node[2].should.be.bignumber.equal(firstTokenId);
            });

            it('firstNode PREV should be node', async function () {
              firstNode[1].should.be.bignumber.equal(tokenId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              firstNode[2].should.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing push', function () {
          let thirdTokenId;
          let thirdNode;

          beforeEach(async function () {
            await this.list.createStructure(value);
            thirdTokenId = await this.list.progressiveId();
          });

          describe('pushFront', function () {
            beforeEach(async function () {
              const { logs } = await this.list.pushFront(thirdTokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(tokenId);
              thirdNode = await this.list.getNode(thirdTokenId);
            });

            it('node PREV should be thirdNode', async function () {
              node[1].should.be.bignumber.equal(thirdTokenId);
            });

            it('thirdNode PREV should be HEAD', async function () {
              thirdNode[1].should.be.bignumber.equal(HEAD);
            });

            it('thirdNode NEXT should be node', async function () {
              thirdNode[2].should.be.bignumber.equal(tokenId);
            });
          });

          describe('pushBack', function () {
            beforeEach(async function () {
              const { logs } = await this.list.pushBack(thirdTokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              secondNode = await this.list.getNode(secondTokenId);
              thirdNode = await this.list.getNode(thirdTokenId);
            });

            it('secondNode NEXT should be thirdNode', async function () {
              secondNode[2].should.be.bignumber.equal(thirdTokenId);
            });

            it('thirdNode PREV should be secondNode', async function () {
              thirdNode[1].should.be.bignumber.equal(secondTokenId);
            });

            it('thirdNode NEXT should be HEAD', async function () {
              thirdNode[2].should.be.bignumber.equal(HEAD);
            });
          });
        });
      });

      describe('adding before (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          await this.list.createStructure(value);
          tokenId = await this.list.progressiveId();
          await this.list.insertAfter(HEAD, tokenId);

          await this.list.createStructure(value);
          firstTokenId = await this.list.progressiveId();
          await this.list.insertBefore(tokenId, firstTokenId);

          await this.list.createStructure(value);
          secondTokenId = await this.list.progressiveId();
          await this.list.insertBefore(firstTokenId, secondTokenId);

          node = await this.list.getNode(tokenId);
          firstNode = await this.list.getNode(firstTokenId);
          secondNode = await this.list.getNode(secondTokenId);
        });

        it('node PREV should be firstNode', async function () {
          node[1].should.be.bignumber.equal(firstTokenId);
        });

        it('node NEXT should be HEAD', async function () {
          node[2].should.be.bignumber.equal(HEAD);
        });

        it('firstNode PREV should be secondNode', async function () {
          firstNode[1].should.be.bignumber.equal(secondTokenId);
        });

        it('firstNode NEXT should be node', async function () {
          firstNode[2].should.be.bignumber.equal(tokenId);
        });

        it('secondNode PREV should be HEAD', async function () {
          secondNode[1].should.be.bignumber.equal(HEAD);
        });

        it('secondNode NEXT should be firstNode', async function () {
          secondNode[2].should.be.bignumber.equal(firstTokenId);
        });

        context('testing getNextNode', function () {
          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getNextNode(tokenId);
              retrievedTokenId[0].should.be.equal(true);
              retrievedTokenId[1].should.be.bignumber.equal(HEAD);
            });
          });

          describe('using firstNode', function () {
            it('should be node', async function () {
              const retrievedTokenId = await this.list.getNextNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(firstTokenId);
              retrievedNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('using secondNode', function () {
            it('should be firstNode', async function () {
              const retrievedTokenId = await this.list.getNextNode(secondTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(secondTokenId);
              retrievedNode[2].should.be.bignumber.equal(tokenId);
            });
          });
        });

        context('testing getPreviousNode', function () {
          describe('using secondNode', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(secondTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(tokenId);
              retrievedNode[2].should.be.bignumber.equal(secondTokenId);
            });
          });

          describe('using firstNode', function () {
            it('should be secondNode', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(HEAD);
              retrievedNode[2].should.be.bignumber.equal(firstTokenId);
            });
          });

          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(tokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(secondTokenId);
              retrievedNode[2].should.be.bignumber.equal(tokenId);
            });
          });
        });
      });
    });

    context('adding more nodes (sorted)', function () {
      let firstTokenId;
      let secondTokenId;

      const firstTokenValue = value.subn(1);
      const secondTokenValue = value.addn(1);

      beforeEach(async function () {
        await this.list.createStructure(value);
        tokenId = await this.list.progressiveId();
        const position = await this.list.getSortedSpot(this.list.address, tokenId);
        await this.list.insertAfter(position, tokenId);

        await this.list.createStructure(firstTokenValue);
        firstTokenId = await this.list.progressiveId();

        await this.list.createStructure(secondTokenValue);
        secondTokenId = await this.list.progressiveId();
      });

      describe('adding nodes (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          let position = await this.list.getSortedSpot(this.list.address, firstTokenValue);
          await this.list.insertAfter(position, firstTokenId);

          position = await this.list.getSortedSpot(this.list.address, secondTokenValue);
          await this.list.insertAfter(position, secondTokenId);

          node = await this.list.getNode(tokenId);
          firstNode = await this.list.getNode(firstTokenId);
          secondNode = await this.list.getNode(secondTokenId);
        });

        it('secondNode PREV should be HEAD', async function () {
          secondNode[1].should.be.bignumber.equal(HEAD);
        });

        it('secondNode NEXT should be node', async function () {
          secondNode[2].should.be.bignumber.equal(tokenId);
        });

        it('node PREV should be secondNode', async function () {
          node[1].should.be.bignumber.equal(secondTokenId);
        });

        it('node NEXT should be firstNode', async function () {
          node[2].should.be.bignumber.equal(firstTokenId);
        });

        it('firstNode PREV should be node', async function () {
          firstNode[1].should.be.bignumber.equal(tokenId);
        });

        it('firstNode NEXT should be HEAD', async function () {
          firstNode[2].should.be.bignumber.equal(HEAD);
        });

        context('testing remove', function () {
          describe('remove node', function () {
            beforeEach(async function () {
              const { logs } = await this.list.remove(tokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              firstNode = await this.list.getNode(firstTokenId);
              secondNode = await this.list.getNode(secondTokenId);
            });

            it('node should no longer exists', async function () {
              node = await this.list.getNode(tokenId);
              node[0].should.be.equal(false);
              node[1].should.be.bignumber.equal(HEAD);
              node[2].should.be.bignumber.equal(HEAD);
            });

            it('firstNode PREV should be secondNode', async function () {
              firstNode[1].should.be.bignumber.equal(secondTokenId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              firstNode[2].should.be.bignumber.equal(HEAD);
            });

            it('secondNode PREV should be HEAD', async function () {
              secondNode[1].should.be.bignumber.equal(HEAD);
            });

            it('secondNode NEXT should be firstNode', async function () {
              secondNode[2].should.be.bignumber.equal(firstTokenId);
            });
          });

          describe('remove firstNode', function () {
            beforeEach(async function () {
              const { logs } = await this.list.remove(firstTokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(tokenId);
              secondNode = await this.list.getNode(secondTokenId);
            });

            it('firstNode should no longer exists', async function () {
              firstNode = await this.list.getNode(firstTokenId);
              firstNode[0].should.be.equal(false);
              firstNode[1].should.be.bignumber.equal(HEAD);
              firstNode[2].should.be.bignumber.equal(HEAD);
            });

            it('node PREV should be secondNode', async function () {
              node[1].should.be.bignumber.equal(secondTokenId);
            });

            it('node NEXT should be HEAD', async function () {
              node[2].should.be.bignumber.equal(HEAD);
            });

            it('secondNode PREV should be HEAD', async function () {
              secondNode[1].should.be.bignumber.equal(HEAD);
            });

            it('secondNode NEXT should be node', async function () {
              secondNode[2].should.be.bignumber.equal(tokenId);
            });
          });

          describe('remove secondNode', function () {
            beforeEach(async function () {
              const { logs } = await this.list.remove(secondTokenId);

              expectEvent.inLogs(logs, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(tokenId);
              firstNode = await this.list.getNode(firstTokenId);
            });

            it('secondNode should no longer exists', async function () {
              secondNode = await this.list.getNode(secondTokenId);
              secondNode[0].should.be.equal(false);
              secondNode[1].should.be.bignumber.equal(HEAD);
              secondNode[2].should.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              node[1].should.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be firstNode', async function () {
              node[2].should.be.bignumber.equal(firstTokenId);
            });

            it('firstNode PREV should be node', async function () {
              firstNode[1].should.be.bignumber.equal(tokenId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              firstNode[2].should.be.bignumber.equal(HEAD);
            });
          });
        });
      });
    });
  });
});
