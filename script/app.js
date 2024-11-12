document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        const content = document.getElementById('Contenido'); // Seleccionamos el contenedor de contenido

        if (searchTerm === "") {
            // Si no hay texto en el campo de búsqueda, eliminar los resaltados
            content.innerHTML = content.textContent; // Restaurar el texto original
            return;
        }

        // Obtener todo el texto dentro del contenedor
        const textNodes = getTextNodes(content); // Obtener todos los nodos de texto dentro de content

        textNodes.forEach(function (node) {
            const originalText = node.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi'); // Expresión regular que resalta las palabras coincidentes

            // Reemplazar las coincidencias con el texto resaltado
            if (regex.test(originalText)) {
                const highlightedText = originalText.replace(regex, (match) => {
                    return `<span class="highlight">${match}</span>`;
                });

                // Actualizar el contenido del nodo con el texto resaltado
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                node.replaceWith(span); // Reemplazar el nodo de texto original con el resaltado
            }
        });
    });
});

// Función para obtener todos los nodos de texto dentro de un contenedor
function getTextNodes(element) {
    let textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    return textNodes;
}
