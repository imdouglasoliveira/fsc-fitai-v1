USE as skills necessárias para (se precisar de novas, instale com base nas referencias https://github.com/anthropics/skills/tree/main/skills, https://skills.sh/, https://github.com/SynkraAI/aios-core, https://github.com/tech-leads-club/agent-skills):

VAMOS unificar a lista de leads em 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\packages\prospeccao\outbound\data\leads.csv' incluindo o segmento para ficar claro qual foi a qualificação do lead e temperatura (tanto para icp 1 quanto 2), para o icp 2 vamos adicionar APENAS HOT e WARM (vou importar como seed no banco de dados), VAMOS migrar os demais dados em 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\packages\prospeccao\outbound\data' e 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\packages\prospeccao\outbound\logs' para 'E:\rf-enriquecimento-dados\db' para otimizar o disco local. 

VAMOS criar a tasks/história com os SEEDS para adicionar ao banco e trocar os dados mockados para trazer os dados reais do banco, QUERO criar as duas campanhas, os ICPs, associar os ICPs aos leads para trackear, o 'Ver detalhes' não carrega os dados MESMO usando MOCKS, precisa revisar a implementação usando com base o projeto criado no figma make em 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\.backup\UI\a8z'.

IDENTIFICAR as diferenças entre UI/UX 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\.backup\UI\a8z' e a implementação no projeto e adequar.

# RULES
NA pasta 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\database\schema' nos temos o shemma atual, views, triggers e functions, SEMPRE revise quando necessário. 
SEMPRE que for mexer no banco, sigas as regras/padronizações definidas em 'C:\Users\dsoliveira\Documents\Github\projeto_a8z\.claude\docs\supabase-schema.md'.