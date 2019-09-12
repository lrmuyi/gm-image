#! /usr/bin/env node

const path = require("path");
const inquirer = require('inquirer') // npm i inquirer -D
const gm = require("gm");

var imageMagick = gm.subClass({
    imageMagick: true
});

const Regex = {
    zh: /[\u4e00-\u9fa5]/,
    en: /[^A-Za-z]/,
    number: /[^0-9]/
}

class ProcessingImage {
    constructor(...args) {
        this.name = args[0].name || 'test'
        this.title = args[0].title || 'hello world'

    }
    calcLength(){
        console.log(Regex.zh.test(this.name))
        console.log(Regex.en.test(this.title))
    }
    draw() {
        imageMagick('tmp.png')
            // .rotate('#ffffff', 180)
            .region(750, 1340, 350, 200)
            .gravity('West')
            .fill('#ffffff')
            .font("PingFang.ttc", 78)
            // .drawText(520, 830, this.name,'East')
            .drawText(0, 0, this.name)
            .font("PingFang.ttc", 60)
            .drawText(0, 138, this.title)
            // .drawText(520, 900, this.title,'East')
            .write(path.resolve(__dirname, `./output/${this.name}.png`), function (err) {
                if (!err) console.log('success');
            });
    }

    flip() {
        imageMagick('tmp.png')
            // .rotate('#ffffff',180)
            .flip()
            .fill('#ffffff')
            .font("PingFang.ttc", 78)
            .drawText(40, 539, this.name)
            // .rotate('#ffffff',180)
            // .flip()
            .write(path.resolve(__dirname, `./flip_output/${this.name}_flip.png`), function (err) {
                if (!err) console.log('success');
            });
    }

    currentTmp() {
        imageMagick(350, 200, "#000000")
            .fill('#ffffff')
            .font("PingFang.ttc", 78)
            .drawText(20, 78, this.name)
            .font("PingFang.ttc", 60)
            .drawText(20, 148, this.title)
            .write(path.resolve(__dirname, `./currentTmp/${this.name}.png`), function (err) {
                if (!err) {
                    console.log('success');
                } else {
                    console.log(err)
                }
            });
    }

    merge() {
        imageMagick()
            .command("composite")
            .in("-gravity", "center")
            .in(path.resolve(__dirname, `./currentTmp/asd.png`))
            .in(path.resolve(__dirname, `./output/asd.png`))
            .write(path.resolve(__dirname, `./merge/${this.name}.png`), function (err) {
                if (!err) {
                    console.log(' hooray! ');
                } else {
                    console.log(err);
                }
            })
    }
}

function start() {
    inquirer.prompt([{
        name: 'name',
        message: '请输入邀请人'
    }, {
        name: 'title',
        message: '请输入头衔'
    }]).then(answers => {
        let drawImage = new ProcessingImage({
            name: answers.name,
            title: answers.title
        })
        // drawImage.draw()
        drawImage.calcLength()
        // drawImage.flip()
        // drawImage.currentTmp()
        // drawImage.merge()
        start()
    })
}

start()