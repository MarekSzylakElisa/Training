# Elisa Network Service Operations Pipeline

A training project that models a telecom service-ticket data pipeline. It is an independent educational simulation and is not an Elisa product or connected to Elisa systems.

## Flow

```text
Oracle (source tickets) -> Extractor -> Kafka -> Transformer -> Elasticsearch
                                                                  ^
                                                        Verification job
```

The extractor detects ticket changes in Oracle and publishes events to Kafka. The transformer validates and enriches events before indexing them in Elasticsearch. A separate verifier compares source records with indexed documents. A deterministic fake-ticket generator will provide the sample workload.

## Technology choices

- Node.js 24 and TypeScript for the pipeline services
- npm workspaces for the monorepo
- Oracle Free as the source database
- Apache Kafka as the event transport
- Elasticsearch as the search index
- Docker Compose for local infrastructure
- Vitest for unit tests

These choices follow the Node option shown in the supplied diagram. The project uses synthetic telecom incident data only; it does not use Elisa customer data, branding assets, credentials, or internal systems.

## Status

The repository, event contract, and sample ticket generator are in place. Next: local infrastructure, Oracle extraction, Kafka transport, Elasticsearch indexing, and verification.

## Local development

Prerequisites: Node.js 24 and npm 11. Docker Compose is needed for the database and streaming services (not yet available in the current environment).

Install dependencies and run the contract tests:

```sh
npm install
npm test
```

Generate sample events as newline-delimited JSON:

```sh
npm run generate:tickets
```

## Project documentation

- [Architecture](Docs/architecture.md)
- [Supplied training diagram](Docs/diagram.png)
- [Event contract](packages/event-contract/src/index.ts)

## Company context

Elisa describes itself as a Finnish telecommunications and technology company, serving consumer, corporate, and public-sector customers and providing software services internationally. This project uses that broad industry context to create a fictional network-operations use case.

Source: [Elisa - About Elisa](https://elisa.com/corporate/about-elisa/)