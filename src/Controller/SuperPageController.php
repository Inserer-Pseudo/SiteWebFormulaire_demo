<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SuperPageController extends AbstractController
{
    #[Route('/super/page', name: 'app_super_page')]
    public function index(): Response
    {
        return $this->render('super_page/index.html.twig', [
            'controller_name' => 'SuperPageController',
        ]);
    }
}
