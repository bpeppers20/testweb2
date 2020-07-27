const form = document.getElementById('infoForm');
const planeAni = document.getElementById('plane');
body = document.getElementById('body');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Variables 
    var valid = true;
    const island = document.getElementById('island_name').value; 
    const bells = document.getElementById('prices').value;
    const dodoCode = document.getElementById('dodo_code').value;

    if (island == '' || island.length > 10)
    {
        valid = false;
        e.preventDefault();
    }
    if (bells == '' || bells.length > 3)
    {
        valid = false
        e.preventDefault();
    }
    if (dodoCode != '')
    {
        // Check DodoCode for validation
        if  (dodoCode.length != 5) {
            valid = false;
            e.preventDefault();
        }
    }
    // Run animation by adding animation class to form
    if (valid) {
        planeAni.style.display = 'block';
        planeAni.className = 'ani'; // Trigger Plane moving animation
        setTimeout(() => {
            body.style.opacity = 0;
            body.className = 'fadeEffect'; // Trigger Fade effect
        }, 2000);
        // Call Animation function within 3 seconds
        setTimeout(()=> {
            form.submit();
        }, 3000);
    }
});