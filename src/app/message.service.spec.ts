import { MessageService } from './message.service';

describe('MessageService', () => {
    let messageService: MessageService;

    beforeEach(() => {

    });

    it ('should not have any messages at the start', () => {
        messageService = new MessageService();

        expect(messageService.messages.length).toEqual(0);
    });

    it('should add a new message when add is called', () => {
        messageService = new MessageService();

        messageService.add('Test Message 1');

        expect(messageService.messages.length).toEqual(1);
    });

    it('should remove all messages when clear is called', () => {
        // arrange
        messageService = new MessageService();
        messageService.add('Test Message 2');
        // act
        messageService.clear();
        // assert
        expect(messageService.messages.length).toEqual(0);
    });

});
