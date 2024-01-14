<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use DateTime;
use App\Entity\Habitant;
use App\Repository\HabitantRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HabitantController extends AbstractController
{
   
    #[Route('/habitant', name: 'app_habitant')]
    public function getAll(HabitantRepository $habitantRepository): Response
    {
        $habitants = $habitantRepository->findAll();
        return $this->json($habitants);
    }

    #[Route('/habitant/create', name: 'app_habitant_create')]
public function create(Request $request, EntityManagerInterface $em): Response
{
    // Utilisez $request->getContent() pour récupérer le contenu du payload
    $data = json_decode($request->getContent(), true);

    // Vérifier si les données nécessaires sont présentes
    if (!isset($data['nom']) || !isset($data['prenom']) || !isset($data['genre']) || !isset($data['dateNaissance']) || !isset($data['adresse'])) {
        return $this->json(['message' => 'Les données du payload sont incorrectes. Assurez-vous d\'inclure le nom et le prénom.'], 400);
    }


    

    // Créez un nouvel objet Habitant avec les valeurs récupérées
    
    $habitant = new Habitant();
    $habitant
        ->setNom($data['nom'])
        ->setPrenom($data['prenom'])
        ->setGenre($data['genre'])
        ->setDateNaissance(DateTime::createFromFormat('d/m/Y', $data['dateNaissance']))
        ->setAdresse($data['adresse']);

    // Persistez l'objet en base de données
    $em->persist($habitant);
    $em->flush();

    return $this->json(["code" => 200, "msg" => "create habitant"]);
}
    #[Route('/habitant/delete/{id}', name: 'app_habitant_delete')]
    public function delete(HabitantRepository $habitantRepository, EntityManagerInterface $em, int $id): Response
    {

        /*
        $headers = $request->headers->all();
        echo($headers);
        */
        
        $habitant = $habitantRepository->find($id);
        $em->remove($habitant);
        $em->flush();
        
        return $this->json(["code"=> 200, "msg"=> "delete habitant"]);
    }
}
