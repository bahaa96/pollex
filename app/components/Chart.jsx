import React from "react"
let Highcharts = require('highcharts');

require('highcharts/modules/exporting')(Highcharts);

export default class Chart extends React.Component {
    constructor(props) {
        super(props)
    }
    optionsFactory() {
        let { poll } = this.props
        let data = []
        for ( let option in poll.options ){
            option = poll.options[option]
            data.push({
                    name: option.title,
                    y: option.votes/poll.votes * 100,
            })
        }
        return data
    }
    componentDidMount() {
        let { poll } = this.props
        Highcharts.chart("myChart", {
            title: {
                text: poll.title
            },
            chart: {
                type: 'pie',
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
                animation: true
            },
            series: [{
                colorByPoint: true,
                data: this.optionsFactory()
            }]
        });
    }
    render(){
        return <div id="myChart"/>
    }
}
