<?php
$name = $_POST['fio'];
$email = $_POST['email'];
$name = htmlspecialchars($fio);
$email = htmlspecialchars($email);
$name = urldecode($fio);
$email = urldecode($email);
$name = trim($fio);
$email = trim($email);
echo $name;
//echo "<br>";
//echo $email;
if (mail("misha.skopenko@yandex.ru", "Заявка с сайта", "ФИО:".$name.". E-mail: ".$email ,"From: example2@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено"; 
} else { 
    echo "при отправке сообщения возникли ошибки";
}?>