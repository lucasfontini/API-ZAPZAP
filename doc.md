```mermaid
graph TD;
    A[Início] --> B[Etapa 1];
    B --> C{Decisão?};
    C -->|Sim| D[Resultado Positivo];
    C -->|Não| E[Resultado Negativo];
    D --> F[Fim];
    E --> F[Fim];
