# Architecture

## Purpose

Demonstrate a maintainable event-driven integration pipeline using a fictional telecom service-desk dataset. The supplied diagram is the functional reference. All tickets and customer details are synthetic.

## Components

| Component | Responsibility |
| --- | --- |
| Oracle | System of record for synthetic service tickets |
| Ticket generator | Creates repeatable sample tickets and changes |
| Extractor | Reads source changes and publishes ticket events |
| Kafka | Buffers ticket events between independent services |
| Transformer | Validates/enriches events and indexes searchable documents |
| Elasticsearch | Search-oriented index containing transformed tickets |
| Verifier | Compares source records with indexed documents and reports mismatches |

The event contract and a deterministic sample-data generator are the first implemented pieces. The remaining pipeline services are planned, not yet implemented.

## Initial domain

The fictional tickets represent connectivity and service incidents, for example a mobile-data outage in a region or a fixed-broadband service degradation. The initial data model should use synthetic identifiers and contain no real personal data.

## Design constraints

- Services must be independently runnable and testable.
- Event processing should be idempotent so Kafka redelivery does not create duplicate logical tickets.
- Changes and deletions must be represented explicitly; the search index must not silently retain deleted tickets.
- Configuration and credentials belong in environment variables, not source control.
- Local dependencies must be runnable from a documented Compose setup.
- Verification should report discrepancies without mutating source data.

## Milestones

1. Create the repository, event contract, and deterministic sample generator.
2. Add local infrastructure and schema/bootstrap scripts.
3. Implement Oracle extraction and Kafka publishing.
4. Implement event transformation and Elasticsearch indexing.
5. Add verification, integration tests, and operational run instructions.

## Reference

The initial component flow is captured in [the supplied diagram](diagram.png).