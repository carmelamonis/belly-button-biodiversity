//Initialize the charts to be for ID 940
function init() {
    d3.json("data/samples.json").then((importedData) => {
        //id, metadata, samples each
        var data = importedData;

        samplesList = data.samples
        metadataList = data.metadata;
        names = data.names;

        var sampleValues = samplesList.map(object => object.sample_values);
        //console.log(sampleValues);
        
        //Sample Values ALREADY sorted
        samplePerson = samplesList[0];    

        //Slice first 10 for plotting
        slicedValues = samplePerson.sample_values.slice(0, 10);
        //console.log(slicedValues);

        slicedIDs = samplePerson.otu_ids.slice(0,10);
        var str1 = "OTU ";
        var concatIDs = slicedIDs.map(id => str1.concat(id));
        console.log(concatIDs);

        slicedLabels = samplePerson.otu_labels.slice(0,10);

        //Create the bar chart
        var trace1 = {
            x: slicedValues.reverse(),
            y: concatIDs.reverse(),
            type: "bar",
            name: "Bar Chart",
            orientation: "h",
            text: slicedLabels.reverse()
        }
        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 Bacteria Cultures Found",
            xaxis: { title: "Values"},
            yaxis: { title: "OTU ID"}
        }

        Plotly.newPlot("bar", data1, layout1);

        //Create bubblechart
        var trace2 = {
            x: samplePerson.otu_ids,
            y: samplePerson.sample_values,
            text: samplePerson.otu_labels,
            mode: "markers",
            marker: {
                size: samplePerson.sample_values,
                color: samplePerson.otu_ids,
                colorscale: "Earth"
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Bacteria Cultures per Sample",
            showlegend: false,
            xaxis: { title: "OTU ID"},
        };

        Plotly.newPlot("bubble", data2, layout2);


        //Fill in Demographic Info
        personData = metadataList[0];
        d3.select(".panel-body")
            .html("")
            .append("ul")
            .html(`<li>ID: 940</li>
            <li>ETHNICITY: ${personData.ethnicity}</li>
            <li>AGE: ${personData.age}</li>
            <li>LOCATION: ${personData.location}</li>
            <li>BBTYPE: ${personData.bbtype}</li>
            <li>WFREQ: ${personData.wfreq}</li>`);

    });
}

function createDropDown() {
    
    d3.json("data/samples.json").then((importedData) => {

        names = importedData.names;

        names.forEach (name => {
            d3.select("#selDataset")
            .append("option")
            .attr("value", name)
            .text(name)
            //(`<option value="${name}">${name}</option>`);
            console.log(`<option value="${name}">${name}</option>`);
        });
    });
};


d3.select("selDataset").on("change", optionChanged);

//Function to create by DOM changes
function optionChanged() {

    var dropdownMenu = d3.select("#selDataset").node();
    var dataset = dropdownMenu.value;

    d3.json("data/samples.json").then((importedData) => {
        //id, metadata, samples each
        var data = importedData;

        samplesList = data.samples
        metadataList = data.metadata;
        names = data.names;

        //Gets the index according to the ID
        var index = names.indexOf(dataset);
        console.log(index);

        var sampleValues = samplesList.map(object => object.sample_values);
        //console.log(sampleValues);
        
        //Sample Values ALREADY sorted
        samplePerson = samplesList[index];    

        //Slice first 10 for plotting
        slicedValues = samplePerson.sample_values.slice(0, 10);
        //console.log(slicedValues);

        slicedIDs = samplePerson.otu_ids.slice(0,10);
        var str1 = "OTU ";
        var concatIDs = slicedIDs.map(id => str1.concat(id));
        console.log(concatIDs);

        slicedLabels = samplePerson.otu_labels.slice(0,10);

        //Create the bar chart
        var trace1 = {
            x: slicedValues.reverse(),
            y: concatIDs.reverse(),
            type: "bar",
            name: "Bar Chart",
            orientation: "h",
            text: slicedLabels.reverse()
        }
        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 Bacteria Cultures Found",
            xaxis: { title: "Values"},
            yaxis: { title: "OTU ID"}
        }

        Plotly.newPlot("bar", data1, layout1);

        //Create bubblechart
        var trace2 = {
            x: samplePerson.otu_ids,
            y: samplePerson.sample_values,
            text: samplePerson.otu_labels,
            mode: "markers",
            marker: {
                size: samplePerson.sample_values,
                color: samplePerson.otu_ids,
                colorscale: "Earth"
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Bacteria Cultures per Sample",
            showlegend: false,
            xaxis: { title: "OTU ID"},
        };

        Plotly.newPlot("bubble", data2, layout2);


        //Fill in Demographic Info
        personData = metadataList[index];
        d3.select(".panel-body")
            .html("")
            .append("ul")
            .html(`<li>ID: ${dataset}</li>
            <li>ETHNICITY: ${personData.ethnicity}</li>
            <li>AGE: ${personData.age}</li>
            <li>LOCATION: ${personData.location}</li>
            <li>BBTYPE: ${personData.bbtype}</li>
            <li>WFREQ: ${personData.wfreq}</li>`);

    });

}

createDropDown();
init();
