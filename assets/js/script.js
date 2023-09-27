function getData() {
    // data collection
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // data validation
    if (name == "") return alert("Name is required");
    else if (email == "") return alert("Email is required");
    else if (phone == "") return alert("Phone Number is required");
    else if (subject == "") return alert("Subject is required");
    else if (message == "") return alert("Message is required");


    // execute to email
    const emailReceiver = email;
    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?subject=${subject}&body= Halo nama saya ${name} , bisakah anda menghubungi saya ${phone} untuk membahas project ${message}`;
    a.click();

    const data = {
        name,
        email,
        phone,
        subject,
        message,
    };

    console.log(data);
}