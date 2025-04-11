import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import {  allOrdersRes, CartItem } from '../../../shared/interfaces/all-orders';
import { AuthhService } from '../../../shared/services/auth/authh.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  
  AllOrders!: allOrdersRes[];

  constructor(
    private _OrderService: OrderService,
    private _AuthhService: AuthhService
  ) {}

  ngOnInit(): void {
    const userId = this._AuthhService.decodeUserData(); 
    if (userId) {
      this.getAllOrdersUser(userId);
    } else {
      console.error('UserId not found');
    }
  }

  getAllOrdersUser(userId: string) {
    this._OrderService.allOrdersUser(userId).subscribe({
      
      next: (res) => {
         


        console.log(res);
        this.AllOrders = res; 

      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
}
