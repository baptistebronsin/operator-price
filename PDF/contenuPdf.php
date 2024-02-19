<?php

    $prix_operateur_0_12 = $_GET['prix_operateur_0_12_input'];
    $prix_operateur_12_24 = $_GET["prix_operateur_12_24_input"];
    $prix_operateur_telephone = $_GET["prix_operateur_telephone_input"];
    $prix_operateur_etalement = $_GET["prix_operateur_etalement_input"];
    $prix_operateur_duree_etalement = $_GET["prix_operateur_duree_etalement_input"];

    $prix_telephone_classique = $_GET["prix_telephone_classique_input"];
    $prix_operateur_classique = $_GET["prix_operateur_classique_input"];

    $prix_operateur_final = floatval($prix_operateur_0_12) * 12 + floatval($prix_operateur_12_24) * 12 + floatval($prix_operateur_telephone) + floatval($prix_operateur_etalement) * floatval($prix_operateur_duree_etalement);
    $prix_classique_final = floatval($prix_telephone_classique) + floatval($prix_operateur_classique) * 24;

    $gain_total = $prix_classique_final - $prix_operateur_final;
    $message_gain = "";

    if ($gain_total >= 0)
        $message_gain = "Vous allez <span style='color: #3CB371; font-weight: bold'>économiser</span>";
    else
        $message_gain = "Vous allez <span style='color: red; font-weight: bold'>perdre</span>";

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"/>
    <style>
        @font-face {
            font-family: myFirstFont;
            src: url(../font-family/ABeeZee-Regular.ttf);
        }

        body {
            font-family: myFirstFont, serif;
            min-height: 100vh;
            margin: 0;
            padding: 0;
        }

        .bulle_informations {
            display: inline-block;
            z-index: 6;
            position: relative;
            background-color: white;
            border: 1px solid #D7D7D7;
            border-radius: 10px;
            padding: 20px;
        }

        .titre {
            position: absolute;
            top: -16px;
            left: 14px;
            margin: 0;
            padding: 4px 10px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 0 3px 4px rgba(216, 214, 214, 0.25);
        }

        p {
            margin: 3px 0;
            padding: 0 10px;
        }

        .section_center {
            text-align: center;
        }

        .input {
            padding: 10px;
            height: auto;
            width: 50%;
            max-width: 100%;
            margin: 0;
            border: none;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="bulle_informations" style="margin: 0 10% 20px;">
        <p class="titre">Comparateur de prix</p>
        <div class="contenu">
            <p>Est-ce que ce téléphone est rentable avec ou sans forfait ?</p>
            <div style="margin-top: 30px; border: 2px solid lightblue;">
                <p class="section_center" style="background-color: lightblue; padding: 10px 0; margin-top: 0;">Avec opérateur</p>
                <p>Prix du forfait par mois les 12 premiers mois : <span class="input" style="background-color: lightblue;"><?= $prix_operateur_0_12 ?></span> €</p>

                <p>Prix du forfait par mois les 12 mois suivants : <span class="input" style="background-color: lightblue;"><?= $prix_operateur_12_24 ?></span> €</p>

                <p>Coût du téléphone : <span class="input" style="background-color: lightblue;"><?= $prix_operateur_telephone ?></span> €</p>

                <p>Coût mensuel de l'étalement de paiement du téléphone : <span class="input" style="background-color: lightblue;"><?php if (empty($prix_operateur_etalement)) echo "0"; else echo $prix_operateur_etalement; ?></span> €</p>

                <p>Nombre de mois pour l'étalement de paiement : <span class="input" style="background-color: lightblue;"><?php if (empty($prix_operateur_duree_etalement)) echo "0"; else echo $prix_operateur_duree_etalement; ?></span> €</p>
            </div>
            <div style="margin-top: 30px; border: 2px solid lightgreen;">
                <p class="section_center" style="background-color: lightgreen; padding: 10px 0; margin-top: 0;">Sans opérateur</p>
                <p>Prix du téléphone dans le commerce : <span class="input" style="background-color: lightgreen;"><?= $prix_telephone_classique ?></span> €</p>

                <p>Prix d'un forfait sans engagement : <span class="input" style="background-color: lightgreen;"><?= $prix_operateur_classique ?></span> €</p>
            </div>
            <div style="margin-top: 30px; border: 2px solid lightcoral">
                <p class="section_center" style="background-color: lightcoral; padding: 10px 0; margin-top: 0;">Conclusion</p>
                <p>Offre de l'opérateur : <span class="input" style="background-color: lightcoral;"><?= $prix_operateur_final ?></span> €</p>

                <p>Prix du téléphone sans l'offre de l'opérateur : <span class="input" style="background-color: lightcoral;"><?= $prix_classique_final ?></span> €</p>

                <p><?= $message_gain ?> : <span class="input" style="background-color: lightcoral;"><?= $gain_total ?></span> €</p>
            </div>
        </div>
    </div>

    <div class="bulle_informations" style="margin-top: 40px">
        <p>Ce PDF a été généré par le site <span style="color: grey">https://<?= strtolower(json_decode(file_get_contents('../../Index/fichiers_JSON/barre_navigation.json'), true)["nom_domaine"]) ?>/Prix_operateur</span></p>
    </div>
</body>
</html>