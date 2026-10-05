import { z } from "zod";

const TicketSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  service: z.enum(["MOBILE", "FIXED_BROADBAND", "TV"]),
  region: z.string().min(1),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED"]),
  openedAt: z.string().datetime(),
  updatedAt: z.string().datetime()
}).strict();

const EventMetadataSchema = z.object({
  eventId: z.string().uuid(),
  ticketId: z.string().min(1),
  version: z.number().int().positive(),
  occurredAt: z.string().datetime()
});

export const TicketEventSchema = z.discriminatedUnion("type", [
  EventMetadataSchema.extend({
    type: z.literal("ticket.upserted"),
    ticket: TicketSchema
  }).strict(),
  EventMetadataSchema.extend({
    type: z.literal("ticket.deleted")
  }).strict()
]).superRefine((event, context) => {
  if (event.type === "ticket.upserted" && event.ticketId !== event.ticket.id) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["ticketId"],
      message: "ticketId must match the ticket id"
    });
  }
});

export type TicketEvent = z.infer<typeof TicketEventSchema>;
export type Ticket = z.infer<typeof TicketSchema>;