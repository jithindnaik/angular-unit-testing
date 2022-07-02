import { MessageService } from "./message.service"

describe('MessageService', () => {
    let service: MessageService;
  
    beforeEach(() => {
        service = new MessageService();
    });

    it('should have no messages at the start', () => {
        let messages = service.messages;

        let count = messages.length;

        expect(count).toEqual(0);
    })

    it('should add a message when add is called', () => {
        service.add('New Message');
        let count = service.messages.length;
        expect(count).toBe(1);
    })

    it('should remove all when clear is called', () => {
        service.add('New Message');
        service.clear();
        expect(service.messages.length).toBe(0);
    })
})