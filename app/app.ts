import {bootstrap}                    from '@angular/platform-browser-dynamic';
import {Component, NgZone, AfterViewInit, OnDestroy} from '@angular/core'

class Chart {
  id: String;
  data: Object;
  height: any;
  width: any;
  constructor(config: Object) {
    this.id = config['id'];
    this.data = config['data'];
    this.height = config['height'] || 300;
    this.width = config['width'] || 600;
  }
}

@Component({
  selector : 'zingchart',
  inputs : ['chart'],
  template : `
   <div id='{{chart.id}}'></div>
  `
})
class ZingChart implements AfterViewInit, OnDestroy {
  chart : Chart;
  constructor(private zone:NgZone) {
  }

  ngAfterViewInit() {
      this.zone.runOutsideAngular(() => {
          zingchart.render({
              id : this.chart['id'],
              data : this.chart['data'],
              width : this.chart['width'],
              height: this.chart['height']
          });
      });
  }

  ngOnDestroy() {
      zingchart.exec(this.chart['id'], 'destroy');
  }
}

//Root Component
@Component({
  selector: 'my-app',
  directives: [ZingChart],
  template: `
    <zingchart *ngFor="#chartObj of charts" [chart]='chartObj'></zingchart>
  `,
})
export class App {
  name : String;
  charts : Chart[];

  constructor() {
    this.name = 'Angular2'
    this.charts = [{
      id : 'chart-1',
      data : {
        type : 'line',
        series : [{
          values :[2,3,4,5,3,3,2]
        }],
      },
      height : 400,
      width : 600
    }]
  }
}


bootstrap(App, [])
  .catch(err => console.error(err));
