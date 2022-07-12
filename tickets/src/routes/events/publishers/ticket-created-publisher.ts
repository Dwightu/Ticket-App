import { Publisher, Subjects, TicketCreatedEvent } from '@dwightu/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
