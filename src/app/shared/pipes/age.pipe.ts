import {Injectable, Pipe, PipeTransform} from '@angular/core';
 
@Pipe({  
    name: 'age',
    standalone: false
})
export class AgePipe implements PipeTransform {
    transform(value: Date): number {    
        const today = new Date();
        const birthDate = new Date(value);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
}