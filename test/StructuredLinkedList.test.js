const { BN, expectEvent } = require('@openzeppelin/test-helpers');

const HEAD = new BN(0);
const INVALID_ITEM_ID = new BN(111);

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
        expect(exists).be.equal(false);
      });
    });

    describe('sizeOf', function () {
      it('should be zero', async function () {
        const sizeOf = await this.list.sizeOf();
        expect(sizeOf).to.be.bignumber.equal(new BN(0));
      });
    });

    describe('getNode', function () {
      it('should not exists', async function () {
        const node = await this.list.getNode(1);
        expect(node[0]).be.equal(false);
        expect(node[1]).to.be.bignumber.equal(HEAD);
        expect(node[2]).to.be.bignumber.equal(HEAD);
      });
    });
  });

  context('when list is not empty (1 node)', function () {
    let itemId;

    context('adding a node', function () {
      beforeEach(async function () {
        await this.list.createStructure(value);
        itemId = await this.list.progressiveId();
        await this.list.insertAfter(HEAD, itemId);
      });

      describe('listExists', function () {
        it('should be true', async function () {
          const exists = await this.list.listExists();
          expect(exists).be.equal(true);
        });
      });

      describe('sizeOf', function () {
        it('should be greater than zero', async function () {
          const sizeOf = await this.list.sizeOf();
          expect(sizeOf).to.be.bignumber.gt(new BN(0));
        });
      });

      describe('nodeExists', function () {
        it('should be true', async function () {
          const nodeExists = await this.list.nodeExists(itemId);
          expect(nodeExists).be.equal(true);
        });
      });

      describe('getNode', function () {
        it('PREV and NEXT should be HEAD', async function () {
          const node = await this.list.getNode(itemId);
          expect(node[0]).be.equal(true);
          expect(node[1]).to.be.bignumber.equal(HEAD);
          expect(node[2]).to.be.bignumber.equal(HEAD);
        });
      });

      describe('getNextNode of not existent node', function () {
        it('should be false', async function () {
          const node = await this.list.getNextNode(INVALID_ITEM_ID);
          expect(node[0]).be.equal(false);
          expect(node[1]).to.be.bignumber.equal(HEAD);
        });
      });

      describe('getPreviousNode of not existent node', function () {
        it('should be false', async function () {
          const node = await this.list.getPreviousNode(INVALID_ITEM_ID);
          expect(node[0]).be.equal(false);
          expect(node[1]).to.be.bignumber.equal(HEAD);
        });
      });

      describe('insertAfter of not existent node', function () {
        it('should fail', async function () {
          await this.list.createStructure(value);

          const newItemId = await this.list.progressiveId();
          const receipt = await this.list.insertAfter(INVALID_ITEM_ID, newItemId);

          expectEvent(receipt, 'LogNotice', {
            booleanValue: false,
          });

          const node = await this.list.getNode(newItemId);
          expect(node[0]).be.equal(false);
          expect(node[1]).to.be.bignumber.equal(HEAD);
          expect(node[2]).to.be.bignumber.equal(HEAD);
        });
      });

      describe('insertBefore of not existent node', function () {
        it('should fail', async function () {
          await this.list.createStructure(value);

          const newItemId = await this.list.progressiveId();
          const receipt = await this.list.insertBefore(INVALID_ITEM_ID, newItemId);

          expectEvent(receipt, 'LogNotice', {
            booleanValue: false,
          });

          const node = await this.list.getNode(newItemId);
          expect(node[0]).be.equal(false);
          expect(node[1]).to.be.bignumber.equal(HEAD);
          expect(node[2]).to.be.bignumber.equal(HEAD);
        });
      });

      describe('remove not existent node', function () {
        it('should fail', async function () {
          const receipt = await this.list.remove(INVALID_ITEM_ID);

          expectEvent(receipt, 'LogNotice', {
            booleanValue: false,
          });
        });
      });

      describe('remove the HEAD node', function () {
        it('should fail', async function () {
          const receipt = await this.list.remove(HEAD);

          expectEvent(receipt, 'LogNotice', {
            booleanValue: false,
          });
        });
      });
    });

    context('adding more nodes (not sorted)', function () {
      let firstItemId;
      let secondItemId;

      describe('adding after (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          await this.list.createStructure(value);
          itemId = await this.list.progressiveId();
          await this.list.insertAfter(HEAD, itemId);

          await this.list.createStructure(value);
          firstItemId = await this.list.progressiveId();
          await this.list.insertAfter(itemId, firstItemId);

          await this.list.createStructure(value);
          secondItemId = await this.list.progressiveId();
          await this.list.insertAfter(firstItemId, secondItemId);

          node = await this.list.getNode(itemId);
          firstNode = await this.list.getNode(firstItemId);
          secondNode = await this.list.getNode(secondItemId);
        });

        it('node PREV should be HEAD', async function () {
          expect(node[1]).to.be.bignumber.equal(HEAD);
        });

        it('node NEXT should be firstNode', async function () {
          expect(node[2]).to.be.bignumber.equal(firstItemId);
        });

        it('firstNode PREV should be node', async function () {
          expect(firstNode[1]).to.be.bignumber.equal(itemId);
        });

        it('firstNode NEXT should be secondNode', async function () {
          expect(firstNode[2]).to.be.bignumber.equal(secondItemId);
        });

        it('secondNode PREV should be firstNode', async function () {
          expect(secondNode[1]).to.be.bignumber.equal(firstItemId);
        });

        it('secondNode NEXT should be HEAD', async function () {
          expect(secondNode[2]).to.be.bignumber.equal(HEAD);
        });

        context('testing getNextNode', function () {
          describe('using node', function () {
            it('should be firstNode', async function () {
              const retrievedItemId = await this.list.getNextNode(itemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(itemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(secondItemId);
            });
          });

          describe('using firstNode', function () {
            it('should be secondNode', async function () {
              const retrievedItemId = await this.list.getNextNode(firstItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(firstItemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(HEAD);
            });
          });

          describe('using secondNode', function () {
            it('should be HEAD', async function () {
              const retrievedItemId = await this.list.getNextNode(secondItemId);
              expect(retrievedItemId[0]).be.equal(true);
              expect(retrievedItemId[1]).to.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing getPreviousNode', function () {
          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedItemId = await this.list.getPreviousNode(itemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(secondItemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(itemId);
            });
          });

          describe('using firstNode', function () {
            it('should be node', async function () {
              const retrievedItemId = await this.list.getPreviousNode(firstItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(HEAD);
              expect(retrievedNode[2]).to.be.bignumber.equal(firstItemId);
            });
          });

          describe('using secondNode', function () {
            it('should be firstNode', async function () {
              const retrievedItemId = await this.list.getPreviousNode(secondItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(itemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(secondItemId);
            });
          });
        });

        context('testing remove', function () {
          describe('remove node', function () {
            beforeEach(async function () {
              const receipt = await this.list.remove(itemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              firstNode = await this.list.getNode(firstItemId);
              secondNode = await this.list.getNode(secondItemId);
            });

            it('node should no longer exists', async function () {
              node = await this.list.getNode(itemId);
              expect(node[0]).be.equal(false);
              expect(node[1]).to.be.bignumber.equal(HEAD);
              expect(node[2]).to.be.bignumber.equal(HEAD);
            });

            it('firstNode PREV should be HEAD', async function () {
              expect(firstNode[1]).to.be.bignumber.equal(HEAD);
            });

            it('firstNode NEXT should be secondNode', async function () {
              expect(firstNode[2]).to.be.bignumber.equal(secondItemId);
            });

            it('secondNode PREV should be firstNode', async function () {
              expect(secondNode[1]).to.be.bignumber.equal(firstItemId);
            });

            it('secondNode NEXT should be HEAD', async function () {
              expect(secondNode[2]).to.be.bignumber.equal(HEAD);
            });
          });

          describe('remove firstNode', function () {
            beforeEach(async function () {
              const receipt = await this.list.remove(firstItemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(itemId);
              secondNode = await this.list.getNode(secondItemId);
            });

            it('firstNode should no longer exists', async function () {
              firstNode = await this.list.getNode(firstItemId);
              expect(firstNode[0]).be.equal(false);
              expect(firstNode[1]).to.be.bignumber.equal(HEAD);
              expect(firstNode[2]).to.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              expect(node[1]).to.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be secondNode', async function () {
              expect(node[2]).to.be.bignumber.equal(secondItemId);
            });

            it('secondNode PREV should be node', async function () {
              expect(secondNode[1]).to.be.bignumber.equal(itemId);
            });

            it('secondNode NEXT should be HEAD', async function () {
              expect(secondNode[2]).to.be.bignumber.equal(HEAD);
            });
          });

          describe('remove secondNode', function () {
            beforeEach(async function () {
              const receipt = await this.list.remove(secondItemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(itemId);
              firstNode = await this.list.getNode(firstItemId);
            });

            it('secondNode should no longer exists', async function () {
              secondNode = await this.list.getNode(secondItemId);
              expect(secondNode[0]).be.equal(false);
              expect(secondNode[1]).to.be.bignumber.equal(HEAD);
              expect(secondNode[2]).to.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              expect(node[1]).to.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be firstNode', async function () {
              expect(node[2]).to.be.bignumber.equal(firstItemId);
            });

            it('firstNode PREV should be node', async function () {
              expect(firstNode[1]).to.be.bignumber.equal(itemId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              expect(firstNode[2]).to.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing pop', function () {
          describe('popFront', function () {
            beforeEach(async function () {
              const receipt = await this.list.popFront();

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              firstNode = await this.list.getNode(firstItemId);
              secondNode = await this.list.getNode(secondItemId);
            });

            it('node should no longer exists', async function () {
              node = await this.list.getNode(itemId);
              expect(node[0]).be.equal(false);
              expect(node[1]).to.be.bignumber.equal(HEAD);
              expect(node[2]).to.be.bignumber.equal(HEAD);
            });

            it('firstNode PREV should be HEAD', async function () {
              expect(firstNode[1]).to.be.bignumber.equal(HEAD);
            });

            it('firstNode NEXT should be secondNode', async function () {
              expect(firstNode[2]).to.be.bignumber.equal(secondItemId);
            });

            it('secondNode PREV should be firstNode', async function () {
              expect(secondNode[1]).to.be.bignumber.equal(firstItemId);
            });

            it('secondNode NEXT should be HEAD', async function () {
              expect(secondNode[2]).to.be.bignumber.equal(HEAD);
            });
          });

          describe('popBack', function () {
            beforeEach(async function () {
              const receipt = await this.list.popBack();

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(itemId);
              firstNode = await this.list.getNode(firstItemId);
            });

            it('secondNode should no longer exists', async function () {
              secondNode = await this.list.getNode(secondItemId);
              expect(secondNode[0]).be.equal(false);
              expect(secondNode[1]).to.be.bignumber.equal(HEAD);
              expect(secondNode[2]).to.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              expect(node[1]).to.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be firstNode', async function () {
              expect(node[2]).to.be.bignumber.equal(firstItemId);
            });

            it('firstNode PREV should be node', async function () {
              expect(firstNode[1]).to.be.bignumber.equal(itemId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              expect(firstNode[2]).to.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing push', function () {
          let thirdItemId;
          let thirdNode;

          beforeEach(async function () {
            await this.list.createStructure(value);
            thirdItemId = await this.list.progressiveId();
          });

          describe('pushFront', function () {
            beforeEach(async function () {
              const receipt = await this.list.pushFront(thirdItemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(itemId);
              thirdNode = await this.list.getNode(thirdItemId);
            });

            it('node PREV should be thirdNode', async function () {
              expect(node[1]).to.be.bignumber.equal(thirdItemId);
            });

            it('thirdNode PREV should be HEAD', async function () {
              expect(thirdNode[1]).to.be.bignumber.equal(HEAD);
            });

            it('thirdNode NEXT should be node', async function () {
              expect(thirdNode[2]).to.be.bignumber.equal(itemId);
            });
          });

          describe('pushBack', function () {
            beforeEach(async function () {
              const receipt = await this.list.pushBack(thirdItemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              secondNode = await this.list.getNode(secondItemId);
              thirdNode = await this.list.getNode(thirdItemId);
            });

            it('secondNode NEXT should be thirdNode', async function () {
              expect(secondNode[2]).to.be.bignumber.equal(thirdItemId);
            });

            it('thirdNode PREV should be secondNode', async function () {
              expect(thirdNode[1]).to.be.bignumber.equal(secondItemId);
            });

            it('thirdNode NEXT should be HEAD', async function () {
              expect(thirdNode[2]).to.be.bignumber.equal(HEAD);
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
          itemId = await this.list.progressiveId();
          await this.list.insertAfter(HEAD, itemId);

          await this.list.createStructure(value);
          firstItemId = await this.list.progressiveId();
          await this.list.insertBefore(itemId, firstItemId);

          await this.list.createStructure(value);
          secondItemId = await this.list.progressiveId();
          await this.list.insertBefore(firstItemId, secondItemId);

          node = await this.list.getNode(itemId);
          firstNode = await this.list.getNode(firstItemId);
          secondNode = await this.list.getNode(secondItemId);
        });

        it('node PREV should be firstNode', async function () {
          expect(node[1]).to.be.bignumber.equal(firstItemId);
        });

        it('node NEXT should be HEAD', async function () {
          expect(node[2]).to.be.bignumber.equal(HEAD);
        });

        it('firstNode PREV should be secondNode', async function () {
          expect(firstNode[1]).to.be.bignumber.equal(secondItemId);
        });

        it('firstNode NEXT should be node', async function () {
          expect(firstNode[2]).to.be.bignumber.equal(itemId);
        });

        it('secondNode PREV should be HEAD', async function () {
          expect(secondNode[1]).to.be.bignumber.equal(HEAD);
        });

        it('secondNode NEXT should be firstNode', async function () {
          expect(secondNode[2]).to.be.bignumber.equal(firstItemId);
        });

        context('testing getNextNode', function () {
          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedItemId = await this.list.getNextNode(itemId);
              expect(retrievedItemId[0]).be.equal(true);
              expect(retrievedItemId[1]).to.be.bignumber.equal(HEAD);
            });
          });

          describe('using firstNode', function () {
            it('should be node', async function () {
              const retrievedItemId = await this.list.getNextNode(firstItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(firstItemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(HEAD);
            });
          });

          describe('using secondNode', function () {
            it('should be firstNode', async function () {
              const retrievedItemId = await this.list.getNextNode(secondItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(secondItemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(itemId);
            });
          });
        });

        context('testing getPreviousNode', function () {
          describe('using secondNode', function () {
            it('should be HEAD', async function () {
              const retrievedItemId = await this.list.getPreviousNode(secondItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(itemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(secondItemId);
            });
          });

          describe('using firstNode', function () {
            it('should be secondNode', async function () {
              const retrievedItemId = await this.list.getPreviousNode(firstItemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(HEAD);
              expect(retrievedNode[2]).to.be.bignumber.equal(firstItemId);
            });
          });

          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedItemId = await this.list.getPreviousNode(itemId);
              const retrievedNode = await this.list.getNode(retrievedItemId[1]);
              expect(retrievedNode[0]).be.equal(true);
              expect(retrievedNode[1]).to.be.bignumber.equal(secondItemId);
              expect(retrievedNode[2]).to.be.bignumber.equal(itemId);
            });
          });
        });
      });
    });

    context('adding more nodes (sorted)', function () {
      let firstItemId;
      let secondItemId;

      const firstItemValue = value.subn(1);
      const secondItemValue = value.addn(1);

      beforeEach(async function () {
        await this.list.createStructure(value);
        itemId = await this.list.progressiveId();
        const position = await this.list.getSortedSpot(this.list.address, itemId);
        await this.list.insertAfter(position, itemId);

        await this.list.createStructure(firstItemValue);
        firstItemId = await this.list.progressiveId();

        await this.list.createStructure(secondItemValue);
        secondItemId = await this.list.progressiveId();
      });

      describe('adding nodes (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          let position = await this.list.getSortedSpot(this.list.address, firstItemValue);
          await this.list.insertAfter(position, firstItemId);

          position = await this.list.getSortedSpot(this.list.address, secondItemValue);
          await this.list.insertAfter(position, secondItemId);

          node = await this.list.getNode(itemId);
          firstNode = await this.list.getNode(firstItemId);
          secondNode = await this.list.getNode(secondItemId);
        });

        it('secondNode PREV should be HEAD', async function () {
          expect(secondNode[1]).to.be.bignumber.equal(HEAD);
        });

        it('secondNode NEXT should be node', async function () {
          expect(secondNode[2]).to.be.bignumber.equal(itemId);
        });

        it('node PREV should be secondNode', async function () {
          expect(node[1]).to.be.bignumber.equal(secondItemId);
        });

        it('node NEXT should be firstNode', async function () {
          expect(node[2]).to.be.bignumber.equal(firstItemId);
        });

        it('firstNode PREV should be node', async function () {
          expect(firstNode[1]).to.be.bignumber.equal(itemId);
        });

        it('firstNode NEXT should be HEAD', async function () {
          expect(firstNode[2]).to.be.bignumber.equal(HEAD);
        });

        context('testing remove', function () {
          describe('remove node', function () {
            beforeEach(async function () {
              const receipt = await this.list.remove(itemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              firstNode = await this.list.getNode(firstItemId);
              secondNode = await this.list.getNode(secondItemId);
            });

            it('node should no longer exists', async function () {
              node = await this.list.getNode(itemId);
              expect(node[0]).be.equal(false);
              expect(node[1]).to.be.bignumber.equal(HEAD);
              expect(node[2]).to.be.bignumber.equal(HEAD);
            });

            it('firstNode PREV should be secondNode', async function () {
              expect(firstNode[1]).to.be.bignumber.equal(secondItemId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              expect(firstNode[2]).to.be.bignumber.equal(HEAD);
            });

            it('secondNode PREV should be HEAD', async function () {
              expect(secondNode[1]).to.be.bignumber.equal(HEAD);
            });

            it('secondNode NEXT should be firstNode', async function () {
              expect(secondNode[2]).to.be.bignumber.equal(firstItemId);
            });
          });

          describe('remove firstNode', function () {
            beforeEach(async function () {
              const receipt = await this.list.remove(firstItemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(itemId);
              secondNode = await this.list.getNode(secondItemId);
            });

            it('firstNode should no longer exists', async function () {
              firstNode = await this.list.getNode(firstItemId);
              expect(firstNode[0]).be.equal(false);
              expect(firstNode[1]).to.be.bignumber.equal(HEAD);
              expect(firstNode[2]).to.be.bignumber.equal(HEAD);
            });

            it('node PREV should be secondNode', async function () {
              expect(node[1]).to.be.bignumber.equal(secondItemId);
            });

            it('node NEXT should be HEAD', async function () {
              expect(node[2]).to.be.bignumber.equal(HEAD);
            });

            it('secondNode PREV should be HEAD', async function () {
              expect(secondNode[1]).to.be.bignumber.equal(HEAD);
            });

            it('secondNode NEXT should be node', async function () {
              expect(secondNode[2]).to.be.bignumber.equal(itemId);
            });
          });

          describe('remove secondNode', function () {
            beforeEach(async function () {
              const receipt = await this.list.remove(secondItemId);

              expectEvent(receipt, 'LogNotice', {
                booleanValue: true,
              });

              node = await this.list.getNode(itemId);
              firstNode = await this.list.getNode(firstItemId);
            });

            it('secondNode should no longer exists', async function () {
              secondNode = await this.list.getNode(secondItemId);
              expect(secondNode[0]).be.equal(false);
              expect(secondNode[1]).to.be.bignumber.equal(HEAD);
              expect(secondNode[2]).to.be.bignumber.equal(HEAD);
            });

            it('node PREV should be HEAD', async function () {
              expect(node[1]).to.be.bignumber.equal(HEAD);
            });

            it('node NEXT should be firstNode', async function () {
              expect(node[2]).to.be.bignumber.equal(firstItemId);
            });

            it('firstNode PREV should be node', async function () {
              expect(firstNode[1]).to.be.bignumber.equal(itemId);
            });

            it('firstNode NEXT should be HEAD', async function () {
              expect(firstNode[2]).to.be.bignumber.equal(HEAD);
            });
          });
        });
      });
    });
  });
});
