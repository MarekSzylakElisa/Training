import { TicketEventSchema, type Ticket } from "@elisa-training/event-contract";

const tickets: Ticket[] = [
  {
    id: "INC-1001",
    title: "Mobile data degradation in Helsinki",
    description: "Synthetic training incident affecting mobile data service.",
    service: "MOBILE",
    region: "Uusimaa",
    severity: "HIGH",
    status: "IN_PROGRESS",
    openedAt: "2026-01-15T09:30:00.000Z",
    updatedAt: "2026-01-15T10:00:00.000Z"
  },
  {
    id: "INC-1002",
    title: "Fixed broadband latency in Tampere",
    description: "Synthetic training incident reporting elevated broadband latency.",
    service: "FIXED_BROADBAND",
    region: "Pirkanmaa",
    severity: "MEDIUM",
    status: "OPEN",
    openedAt: "2026-01-15T09:45:00.000Z",
    updatedAt: "2026-01-15T09:45:00.000Z"
  },
  {
    id: "INC-1003",
    title: "TV service interruption in Turku",
    description: "Synthetic training incident affecting a regional TV service.",
    service: "TV",
    region: "Southwest Finland",
    severity: "LOW",
    status: "RESOLVED",
    openedAt: "2026-01-14T16:20:00.000Z",
    updatedAt: "2026-01-15T08:10:00.000Z"
  }
];

for (const [index, ticket] of tickets.entries()) {
  const event = TicketEventSchema.parse({
    type: "ticket.upserted",
    eventId: `00000000-0000-4000-8000-${(index + 1).toString().padStart(12, "0")}`,
    ticketId: ticket.id,
    version: 1,
    occurredAt: ticket.updatedAt,
    ticket
  });

  process.stdout.write(`${JSON.stringify(event)}\n`);
}