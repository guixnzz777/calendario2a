# 📅 Calendário Escolar Compartilhado

**Um sistema integrado entre planilha online e site para gerenciamento do calendário acadêmico**

## ✨ Visão Geral

Este projeto permite que professores e coordenadores mantenham um calendário escolar atualizado através de uma planilha do Google Sheets, com visualização automática em um site HTML/CSS/JS.

## 🛠️ Funcionalidades Principais

- **Atualização via Planilha**: Adicione/edite eventos diretamente no Google Sheets
- **Visualização Intuitiva**: Calendário mensal com cores por tipo de evento
- **Acesso Offline**: Dados salvos localmente como fallback
- **Responsivo**: Funciona em computadores e celulares

## 🏁 Começando

### Pré-requisitos
- Conta Google (para editar a planilha)
- Navegador moderno (Chrome, Firefox, Edge)

### Configuração
1. **Planilha Base**:
   - Faça uma cópia deste modelo: [Planilha Modelo](https://docs.google.com/spreadsheets/d/1NoaJ4pcxVdUwY-vjDZ-lnXmQjwIxkfm_LzM89-h3ZhY/edit?usp=sharing)
   - Compartilhe com os professores como **"Editores"**

2. **Personalização**:
   - Substitua `SPREADSHEET_ID` no arquivo `script.js` pelo ID da sua planilha
   - Modifique as cores no arquivo `style.css` conforme seu tema

## 📊 Estrutura da Planilha
| Coluna | Descrição | Formato | Exemplo |
|--------|-----------|---------|---------|
| A (Data) | Data do evento | DD/MM/AAAA | 15/09/2024 |
| B (Título) | Nome do evento | Texto | Prova de Matemática |
| C (Tipo) | Categoria | `evento`, `teste` ou `feriado` | teste |
| D (Descrição) | Detalhes | Texto opcional | Capítulos 1-3 |

## 🚀 Como Publicar
1. Hospede os arquivos em:
   - GitHub Pages
   - Netlify
   - Google Sites (incorporando o HTML)
   
2. Acessível via:
   ```bash
   https://suaescola.github.io/calendario/
   ```

## 🆘 Suporte
Problemas comuns:
- **Eventos não aparecem?** Verifique o formato da data
- **Erro de acesso?** Confira as permissões da planilha
- **Dúvidas técnicas?** Abra uma [issue](https://github.com/guixnzz777/calendario2a/issues)

## 📜 Licença
Distribuído sob licença MIT. Veja `LICENSE` para mais informações.

## ✉️ Contato
E-mail p/ contato - [00001134094139sp@al.educacao.sp.gov.br](mailto:00001134094139sp@al.educacao.sp.gov.br)

---

💡 **Dica**: Professores podem editar diretamente a planilha - nenhum conhecimento técnico é necessário!

*(Atualizado em 22/06/2025)*