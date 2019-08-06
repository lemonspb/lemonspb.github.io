<?php
$name = $_POST['name'];
$email = $_POST['email'];
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$name = urldecode($name);
$email = urldecode($email);
$name = trim($name);
$email = trim($email);
echo $name;
//echo "<br>";
//echo $email;
if (mail("misha.skopenko@yandex.ru", "Заявка с сайта", "ФИО:".$name.". E-mail: ".$email ,"From: misha.skopenko@yandex.ru \r\n"))
 {     echo "сообщение успешно отправлено"; 
} else { 
    echo "при отправке сообщения возникли ошибки";
}?>