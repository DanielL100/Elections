<!DOCTYPE html>
<html>
<head>
    
<?php 

$lastUpdate;
$general_table;
$needToChange = false;
$general = array();
$parties = array();
$partiesChar = array();
$precentParties = array();
$votesParties = array();
$general_is_empty = true;

/***** PYTHON CHECK *****/
/* $tempUrl = fopen("web.txt", 'r');
$url = fread($tempUrl, filesize('web.txt'));
echo ("URL: " . $url . "<br>"); */

//$url = "https://web.archive.org/web/20210324000310/https://votes24.bechirot.gov.il/";
$url = "https://votes25.bechirot.gov.il/";
$wayback = $url == "https://web.archive.org/web/20210324000310/https://votes24.bechirot.gov.il/";

try{
    $file = file_get_contents($url);

    $doc = new DomDocument();

    libxml_use_internal_errors(true);

    $doc->loadHTML(file_get_contents($url));

    $status_line = $http_response_header[0];

    preg_match('{HTTP\/\S*\s(\d{3})}', $status_line, $match);

    $status = $match[1];

    if ($status == "200") {
        $finder = new DomXPath($doc);
        $lastUpdate = trim($finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' LastUpdate ')]")->item(0)->nodeValue);

        if(file_exists("data/data.json")){
            //checks if need to change the JSON file
            $file = fopen("data/data.json", "r");
            if (flock($file, LOCK_SH)){
                $json = fread($file, filesize("data/data.json"));
                $data = json_decode($json, true);

                if(isset($data["lastUpdate"])){
                    echo "Last update exist<br>";
                    if($data["lastUpdate"] != $lastUpdate){
                        echo "Time changed<br>";
                        if(strpos($data["lastUpdate"], "סופיות") != false){
                            $backup = fopen("data/סופיות.json", "w");
                        } else {
                            $backup = fopen("data/" . substr(str_replace(":", ".", str_replace("/", ".", $data["lastUpdate"])), strlen($data["lastUpdate"]) - 16) . ".json", "w");
                        }
                        fwrite($backup, $json);
                        fclose($backup);
                        $needToChange = true;
                    }
                } else{
                    echo "Last update does not exist<br>";
                    $needToChange = true;
                }
                flock($file, LOCK_UN);
            } else {
                echo "Could not read the file";
                $needToChange = false;
            }

            fclose($file);
        } else {
            echo "Creates File<br>";
            $needToChange = true;
        }


        if ($needToChange){

            if($wayback && count($doc->getElementsByTagName('table')->item(2)->getElementsByTagName('tr')->item(0)->getElementsByTagName('th')) == 5){
                echo "WAYBACK - ENDED";
                $general_table = $doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr');
                foreach($general_table->item(0)->getElementsByTagName('th') as $key=>$cell){
                    $general[trim($cell->nodeValue)] = trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue);
                    if(trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "" && trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "0"){
                        $general_is_empty = false;
                        echo "not zero";
                    }
                }

                try {
                    $parties_table = $doc->getElementsByTagName('table')->item(2)->getElementsByTagName('tr');
                    foreach($parties_table as $row){
                        foreach($row->getElementsByTagName('td') as $key=>$cell){
                            switch($key){
                                case 0:
                                    array_push($parties, trim($row->getElementsByTagName('th')->item(0)->nodeValue));
                                    array_push($partiesChar, trim($cell->nodeValue));
                                    break;
                                case 1:
                                    break;
                                case 2:
                                    array_push($precentParties, trim($cell->nodeValue));
                                    break;
                                case 3:
                                    array_push($votesParties, trim($cell->getElementsByTagName('div')->item(0)->nodeValue));
                                    break;
                                default:
                                    break;
                            }
                            
                        }
                    }
                } catch (Exception $e){
                    echo "NO DATA AVAILABLE";
                }
            } else if ($wayback) {
                echo "WAYBACK - STILL RUNNING";
                $general_table = $doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr');
                foreach($general_table->item(0)->getElementsByTagName('th') as $key=>$cell){
                    $general[trim($cell->nodeValue)] = trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue);
                    if(trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "" && trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "0")
                        $general_is_empty = false;
                }

                try{
                    if(count($doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr')) == 1)
                        $parties_table = $doc->getElementsByTagName('table')->item(3)->getElementsByTagName('tr');
                    else
                        $parties_table = $doc->getElementsByTagName('table')->item(2)->getElementsByTagName('tr');
                    foreach($parties_table as $row){
                        foreach($row->getElementsByTagName('td') as $key=>$cell){
                            switch($key){
                                case 0:
                                    array_push($parties, trim($row->getElementsByTagName('th')->item(0)->nodeValue));
                                    array_push($partiesChar, trim($cell->nodeValue));
                                    break;
                                case 1:
                                    array_push($precentParties, trim($cell->nodeValue));
                                    break;
                                case 2:
                                    array_push($votesParties, trim($cell->getElementsByTagName('div')->item(0)->nodeValue));
                                    break;
                                default:
                                    break;
                            }
                            
                        }
                    }
                } catch (Exception $e){
                    echo "NO DATA AVAILABLE";
                }
            } else if(count($doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr')->item(0)->getElementsByTagName('th')) == 5){
                echo "Website - ENDED";
                $general_table = $doc->getElementsByTagName('table')->item(0)->getElementsByTagName('tr');
                foreach($general_table->item(0)->getElementsByTagName('th') as $key=>$cell){
                    $general[trim($cell->nodeValue)] = trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue);
                    if(trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "" && trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "0")
                        $general_is_empty = false;
                }

                try{
                    if(count($doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr')) == 1)
                        $parties_table = $doc->getElementsByTagName('table')->item(2)->getElementsByTagName('tr');
                    else
                        $parties_table = $doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr');
                    foreach($parties_table as $row){
                        foreach($row->getElementsByTagName('td') as $key=>$cell){
                            switch($key){
                                case 0:
                                    array_push($parties, trim($row->getElementsByTagName('th')->item(0)->nodeValue));
                                    array_push($partiesChar, trim($cell->nodeValue));
                                    break;
                                case 1:
                                    break;
                                case 2:
                                    array_push($precentParties, trim($cell->nodeValue));
                                    break;
                                case 3:
                                    array_push($votesParties, trim($cell->getElementsByTagName('div')->item(0)->nodeValue));
                                    break;
                                default:
                                    break;
                            }
                            
                        }
                    }
                } catch (Exception $e){
                    echo "NO DATA AVAILABLE";
                }
            } else {
                echo "Website - STILL RUNNING";
                $general_table = $doc->getElementsByTagName('table')->item(0)->getElementsByTagName('tr');
                foreach($general_table->item(0)->getElementsByTagName('th') as $key=>$cell){
                    $general[trim($cell->nodeValue)] = trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue);
                    if(trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "" && trim($general_table->item(1)->getElementsByTagName('td')->item($key)->nodeValue) != "0")
                        $general_is_empty = false;
                }
                
                try{
                    $parties_table = $doc->getElementsByTagName('table')->item(1)->getElementsByTagName('tr');
                    foreach($parties_table as $row){
                        foreach($row->getElementsByTagName('td') as $key=>$cell){
                            switch($key){
                                case 0:
                                    array_push($parties, trim($row->getElementsByTagName('th')->item(0)->nodeValue));
                                    array_push($partiesChar, trim($cell->nodeValue));
                                    break;
                                case 1:
                                    array_push($precentParties, trim($cell->nodeValue));
                                    break;
                                case 2:
                                    array_push($votesParties, trim($cell->getElementsByTagName('div')->item(0)->nodeValue));
                                    break;
                                default:
                                    break;
                            }
                            
                        }
                    }
                } catch (Exception $e){
                    echo "NO DATA AVAILABLE";
                }
            }

            // //prints arrays to screen
            // echo '<pre>'; echo json_encode($acceptedVotes, JSON_FORCE_OBJECT); echo '</pre>';
            // echo '<pre>'; echo json_encode($parties, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); echo '</pre>';
            // echo '<pre>'; echo json_encode($partiesChar, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); echo '</pre>';
            // echo '<pre>'; echo json_encode($precentParties, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); echo '</pre>';
            // echo '<pre>'; echo json_encode($votesParties, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); echo '</pre>';


            //Encodes arrays to JSON
            $generalJSON = json_encode($general, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
            $partiesJSON = json_encode($parties, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
            $partiesCharJSON = json_encode($partiesChar, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
            $precentPartiesJSON = json_encode($precentParties, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
            $votesPartiesJSON = json_encode($votesParties, JSON_FORCE_OBJECT|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);


            //adds tabs to arrays in JSON
            $generalJSON = str_replace("\n", "\n\t", $generalJSON);
            $partiesJSON = str_replace("\n", "\n\t", $partiesJSON);
            $partiesCharJSON = str_replace("\n", "\n\t", $partiesCharJSON);
            $precentPartiesJSON = str_replace("\n", "\n\t", $precentPartiesJSON);
            $votesPartiesJSON = str_replace("\n", "\n\t", $votesPartiesJSON);


            echo ("<br>general is empty? ");
            echo(var_export($general_is_empty));
            if(!$general_is_empty){
                //prints arrays to screen
                printf("\n<pre>");
                printf("{\n");
                printf("\t\"url\": \"" . $url . "\",\n");
                printf("\t\"lastUpdate\": '" . $lastUpdate . "',\n");
                printf("\t\"general\": " . str_replace("%", "%%", $generalJSON) . ",\n");
                printf("\t\"parties\": " . $partiesJSON . ",\n");
                printf("\t\"partiesChar\": " . $partiesCharJSON . ",\n");
                printf("\t\"precentParties\": " . str_replace("%", "%%", $precentPartiesJSON) . ",\n");
                printf("\t\"votesParties\": " . $votesPartiesJSON . "\n");
                printf("}");
                printf("</pre>");


                //write to file
                $file = fopen("data/data.json", "w");
                if (flock($file, LOCK_EX)) { 
                    fwrite($file, "{\n");
                    fwrite($file, "\t\"url\": \"" . $url . "\",\n");
                    fwrite($file, "\t\"lastUpdate\": \"" . $lastUpdate . "\",\n");
                    fwrite($file, "\t\"general\": " . $generalJSON . ",\n");
                    fwrite($file, "\t\"parties\": " . $partiesJSON . ",\n");
                    fwrite($file, "\t\"partiesChar\": " . $partiesCharJSON . ",\n");
                    fwrite($file, "\t\"precentParties\": " . $precentPartiesJSON . ",\n");
                    fwrite($file, "\t\"votesParties\": " . $votesPartiesJSON . "\n");
                    fwrite($file, "}");
                    flock($file, LOCK_UN);
                } else {
                    echo "Could not wrtie to file JSON";
                }
                fclose($file);
            } else {
                echo "<br>Didn't change since there is no data";
            }
        } else {
            echo "Time was not changed";
        }
    }
} catch (Exception $e){
    
}

?>

</head>
<body></body>
</html>