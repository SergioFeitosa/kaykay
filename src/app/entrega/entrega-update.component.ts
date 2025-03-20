import { Router, ActivatedRoute } from '@angular/router';
import { EntregaService } from './entrega.service';
import { Component, OnInit } from '@angular/core';
import { Entrega } from './entrega';

@Component({
  selector: 'app-entrega-update',
  templateUrl: './entrega-update.component.html',
})

export class EntregaUpdateComponent implements OnInit {


  entrega = {} as Entrega;


  constructor(
    private entregaService: EntregaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.entregaService.readById(id).subscribe(entrega => {
      this.entrega = entrega;

      entrega.dataCriacao = new Date();

      this.entregaService.update(entrega).subscribe(() => {

        this.entregaService.showMessage('Entrega Atualizada');
        this.router.navigate(['/entrega']);
      });
    });
  }

  updateEntrega(entrega: Entrega): void {
    this.entregaService.update(entrega).subscribe(() => {
      this.entregaService.showMessage('Entrega Atualizada');
      this.router.navigate(['/entregas']);
    });
  }
}
