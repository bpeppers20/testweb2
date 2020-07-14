function validator(event) //Called by regHandle
{ 
    // Variables 
    const server = document.getElementById('server').value;
    const island = document.getElementById('island_name').value; 
    const bells = document.getElementById('prices').value;
    const dodoCode = document.getElementById('dodo_code').value;
   
    if (island == '')
    {
        return false;
    }
    if (bells == '')
    {
        return false;
    }
    if (dodoCode != '')
    {
        // Check DodoCode for validation
    }
    return true;
}

function regHandle() // Loaded in the body so we can grab the form by id 
{
    document.getElementById("infoForm").onsubmit = validator; // Calls from the form the validation form via function ref GlobalEventHandlers
}