import { MessageService } from "./message.service";

describe('MessageService', () => {

  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  })

  it('should have no message to start', () => {
    expect(service.messages.length).toBe(0);
  })

  it('should add a message when add is called', () => {
    service.add('new message');
    expect(service.messages.length).toBe(1);
  })

  it('should remove all messages when clear is called', () => {
    service.add('new message');
    service.clear();
    expect(service.messages.length).toBe(0);
  })

})
