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
    public function create(HabitantRepository $habitantRepository, EntityManagerInterface $em, Request $request): Response
    {

/*
        $headers = $request->headers->all();
        echo($headers);*/
        /*
        $habitant = new Habitant();
        $habitant
            ->setNom('Test')
            ->setPrenom('Test')
            ->setDateNaissance(DateTime::createFromFormat('d/m/Y', '13/01/2024'))
            ->setGenre(1)
            ->setAdresse('test');

        $em->persist($habitant);
        $em->flush();
        */
        return $this->json(["code"=> 200, "msg"=> "create habitant"]);
    }
}
