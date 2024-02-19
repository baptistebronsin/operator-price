<?php

use Dompdf\Dompdf;

if (!empty($_GET['prix_operateur_0_12_input']) and !empty($_GET['prix_operateur_12_24_input']) and !empty($_GET['prix_operateur_telephone_input']) and !empty($_GET['prix_telephone_classique_input']) and !empty($_GET['prix_operateur_classique_input'])) {
    ob_start();

    $url = 'contenuPdf.php';

    require_once $url;

    $html = ob_get_contents();

    ob_end_clean();

    include_once 'dompdf/autoload.inc.php';

    $dompdf = new Dompdf();

    $dompdf->loadHtml($html);

    $dompdf->setPaper('A4', 'portait');

    $dompdf->render();

    $nomFichier = "Prix_opérateur.pdf";

    $dompdf->stream($nomFichier);
}
else {
    echo "<h1>Il manque certains arguments à votre requête. Veuillez retourner à <a href='../index.html' style='color: royalblue'>la page principale</a>.</h1>";
}


?>