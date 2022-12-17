const projecsBtn = document.getElementById('projects-btn').addEventListener('click', () => {
    siiimpleToast.message('💻 Projects section is under development 💻', {
        container: 'body',
        class: 'siiimpleToast',
        position: 'bottom|center',
        margin: 15,
        delay: 0,
        duration: 1000,
        style: {
            fontSize: 'var(--font-l)',
            backgroundColor: 'darkred',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            borderRadius: 0,
        }
    });
})