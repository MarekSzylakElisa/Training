import { describe, expect, it } from "vitest";
import { TicketEventSchema } from "../src/index.js";

const sampleTicket = {
  id: "INC-1001",
  title: "Mobile data degradation in Helsinki",
  description: "Synthetic training incident affecting mobile data service.",
  service: "MOBILE",
  region: "Uusimaa",
  severity: "HIGH",
  status: "IN_PROGRESS",
  openedAt: "2026-01-15T09:30:00.000Z",
  updatedAt: "2026-01-15T10:00:00.000Z"
} as const;

describe("TicketEventSchema", () => {
  it("accepts a versioned ticket upsert event", () => {
    const event = {
      type: "ticket.upserted",
      eventId: "32a657b0-10e3-4f4e-ae24-4c83d659a5e2",
      ticketId: sampleTicket.id,
      version: 1,
      occurredAt: "2026-01-15T10:00:00.000Z",
      ticket: sampleTicket
    };

    expect(TicketEventSchema.safeParse(event).success).toBe(true);
  });

  it("accepts an explicit versioned deletion event", () => {
    const event = {
      type: "ticket.deleted",
      eventId: "32a657b0-10e3-4f4e-ae24-4c83d659a5e2",
      ticketId: sampleTicket.id,
      version: 2,
      occurredAt: "2026-01-15T10:30:00.000Z"
    };

    expect(TicketEventSchema.safeParse(event).success).toBe(true);
  });

  it("rejects an upsert whose ticket identity differs from the event", () => {
    const event = {
      type: "ticket.upserted",
      eventId: "32a657b0-10e3-4f4e-ae24-4c83d659a5e2",
      ticketId: "INC-OTHER",
      version: 1,
      occurredAt: "2026-01-15T10:00:00.000Z",
      ticket: sampleTicket
    };

    expect(TicketEventSchema.safeParse(event).success).toBe(false);
  });
});