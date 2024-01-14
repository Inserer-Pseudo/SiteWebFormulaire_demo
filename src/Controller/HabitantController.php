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

    #[Route('/habitant/create', name: 'app_habitant_create', method: 'POST')]
    public function create(HabitantRepository $habitantRepository, EntityManagerInterface $em, Request $req): Response
    {


        echo "$req"
        
        $habitant = new Habitant();
        $habitant
            ->setNom('Test')
            ->setPrenom('Test')
            ->setGenre('test')
            ->setDateNaissance(DateTime::createFromFormat('d/m/Y', '13/01/2024'))
            ->setAdresse('test');

        $em->persist($habitant);
        $em->flush();
        
        return $this->json(["code"=> 200, "msg"=> "create habitant"]);
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
