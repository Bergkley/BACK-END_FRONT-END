
  document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)
    
    const formData = new FormData(this); // Obtém os dados do formulário
    const url = formData.get('url'); // Obtém o valor do campo 'url'

    try {
      const response = await fetch('/new', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json(); // Se a resposta for um JSON
        alert('URL encurtada com sucesso! Código: ' + result.code);
      } else {
        throw new Error('Erro ao encurtar a URL');
      }
    } catch (error) {
      alert('Houve um erro ao encurtar a URL.');
      console.error(error);
    }
  });

