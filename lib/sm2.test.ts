import { supermemo, SuperMemoItem } from './sm2';

describe('supermemo两个等级版本', () => {
    let item: SuperMemoItem = {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
    };

    it('Grade: 2', () => {
        item = supermemo(item, 2);
        console.log('2 item', item)
        // 根据新的算法，这时的interval应该为1，repetition为1，efactor为2.6
        expect(item).toEqual({ interval: 1, repetition: 1, efactor: 2.6 });
    });

    // it('Grade: 2', () => {
    //     item = supermemo(item, 0);
    //     console.log('1 item', item)
    //     // 根据新的算法，这时的interval应该为3，repetition为2，efactor为2.26
    //     expect(item).toEqual({ interval: 3, repetition: 2, efactor: 2.26 });
    // });

    // it('Grade: 2', () => {
    //     item = supermemo(item, 0);
    //     console.log('0 item', item)
    //     // 当Grade为0时，repetition应该重置为0，interval为1，efactor为1.3
    //     expect(item).toEqual({ interval: 1, repetition: 0, efactor: 1.3 });
    // });

    // it('Grade: 2 after reset', () => {
    //     item = supermemo(item, 0);
    //     console.log('reset item', item)
    //     // 在重置之后，再次得到Grade为2，此时interval应该为1，repetition为1，efactor为1.44
    //     expect(item).toEqual({ interval: 1, repetition: 1, efactor: 1.44 });
    // });
});
