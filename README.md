
# Portal do Paciente - Urgetrauma Digital

Este portal foi desenvolvido para agilizar o atendimento de pacientes da Urgetrauma, permitindo a validação de sessões via Reconhecimento Facial ou confirmação de dados cadastrais.

**Slogan:** Saúde e movimento.

## 🚀 Como fazer o Deploy

### Vercel
1. Conecte seu repositório GitHub à Vercel.
2. Nas configurações de **Environment Variables**, adicione:
   - `API_KEY`: Sua chave da API do Google Gemini.
3. Clique em **Deploy**. O Vercel detectará automaticamente a configuração do Vite.

## 🛠️ Funcionalidades
- **Check-in Digital**: Validação biométrica ou por dados para agilizar recepção.
- **Gestão de Autorizações**: Envio e acompanhamento de requisições de exames de imagem e fisioterapia.
- **Assistente AI Urgetrauma**: Chatbot especializado em traumato-ortopedia alimentado pelo Gemini.
- **Área de Gestão**: Painel para clínicas monitorarem a chegada de pacientes em tempo real.

## 📋 Requisitos de Segurança
A `API_KEY` do Gemini é necessária para o funcionamento do assistente virtual.
