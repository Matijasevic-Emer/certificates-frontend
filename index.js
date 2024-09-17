document.addEventListener('DOMContentLoaded', function () {
    fetch('https://ematijasevic-certs.netlify.app/.netlify/functions/server/certs')
        .then(response => response.json())
        .then(certificates => {
            // Ordenar los certificados por fecha de inicio, del más nuevo al más viejo
            certificates.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

            const container = document.getElementById('certificates-container');
            certificates.forEach(cert => {
                const card = document.createElement('div');
                card.className = 'cert-card';

                const image = document.createElement('div');
                image.className = 'cert-image';

                if (cert.imageBase64) {
                    const img = document.createElement('img');
                    img.src = `data:image/png;base64,${cert.imageBase64}`;
                    img.alt = cert.title;
                    image.appendChild(img);
                } else {
                    image.textContent = cert.state;
                }

                const info = document.createElement('div');
                info.className = 'cert-info';

                let linkOrgHTML = '';
                if (cert.linkOrg) {
                    linkOrgHTML = `<a href="${cert.linkOrg}" target="_blank">Ver curso</a>`;
                }

                info.innerHTML = `
                    <h3>${cert.title}</h3>
                    <p><strong>Proveedor:</strong> ${cert.provider}</p>
                    <p><strong>Fecha de Inicio:</strong> ${cert.startDate}</p>
                    <p><strong>Fecha de Finalización:</strong> ${cert.finishDate}</p>
                    <p><strong>Duración:</strong> ${cert.durationInMonth === 9999 ? cert.durationInHours + " Horas" : cert.durationInMonth + " Meses"}</p>
                    <p><strong>Tecnologías:</strong> ${cert.stack.join(', ')}</p>
                    ${linkOrgHTML}
                `;

                const link = document.createElement('a');
                link.textContent = "Ver Certificado";
                if (cert.linkCert) {
                    link.href = cert.linkCert;
                    link.target = "_blank";
                } else {
                    link.href = "#";
                    link.className = "disabled";
                }

                info.appendChild(link);
                card.appendChild(image);
                card.appendChild(info);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching certificates:', error));
});
