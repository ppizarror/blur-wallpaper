/*
MULTIFILTER-WALLPAPER
Github: https://github.com/ppizarror/MultiFilter-Wallpaper

MIT License
Copyright (c) 2017 Pablo Pizarro R. @ ppizarror.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function updateFileList(mode, currentFiles) {
    // Write status message on console
    switch (mode) {
        case 'add':
            consolemsg('Added or changed file {0}.'.format(currentFiles));
            break;
        case 'del':
            consolemsg('File {0} deleted.'.format(currentFiles));
            break;
        default:
            break;
    }
}

function randomImageResponse(propertyName, filePath) {
    // Set random wallpaper
    setWallpaper(filePath);
    selectedimg = filePath;
}

function dummy2varfun(a, b) {}

function nextRandomImage() {
    // Next Random Image
    try {
        for (i = 0; i < maxrandomiterations; i++) {
            r = Math.random();
            if (r < randomlimitsup) {
                consolemsg('Random image chosen in {0} iterations. r={1}<{2}'.format(i, roundNumber(r, 2), randomlimitsup));
                window.wallpaperRequestRandomFileForProperty('customrandomdirectory', randomImageResponse);
                return;
            }
            window.wallpaperRequestRandomFileForProperty('customrandomdirectory', dummy2varfun);
        }
    } catch (e) {
        consolemsg(parseException(e));
    } finally {}

}

function setWallpaperSingleImage() {
    // Set single image
    setWallpaper(selectedimg, false);
}

// Property Listener
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {

        // Background color if no image
        if (properties.backgroundcolor) {
            try {
                defaultcolorcss = createRGBColor(properties.backgroundcolor.value);
                consolemsg('Default background color: {0}.'.format(setRgbLineMsg(defaultcolorcss)));
                setWallpaper();
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Load random directory
        if (properties.customrandomdirectory) {
            if (properties.customrandomdirectory.value) {
                try {
                    consolemsg('Set random directory "<i>{0}</i>".'.format(cutword(properties.customrandomdirectory.value, maxwordlengthdirs)));
                    setWallpaper(false, false);
                    israndom = true;
                    selectedfolder = properties.customrandomdirectory.value;
                    selectedimg = '';
                    lastimg = '';
                    nextRandomImage();
                    if (israndom && randomtime > 0) {
                        clearRandomFunTimer();
                        intervalsetminutesmsg('Randomize thread', randomtime);
                        timedrandomizefun = setInterval(nextRandomImage, randomtime);
                    } else {
                        clearRandomFunTimer();
                    }
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}
            } else {
                clearAll();
            }
        }

        // Click to randomize
        if (properties.clickrandomize) {
            try {
                if (israndom && randomtime > 0) {
                    nextRandomImage();
                    clearRandomFunTimer();
                    intervalsetminutesmsg('Randomize thread', randomtime);
                    timedrandomizefun = setInterval(nextRandomImage, randomtime);
                    1111
                } else {
                    clearRandomFunTimer();
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Read single selected image
        if (properties.customimage) {
            if (properties.customimage.value) {
                try {
                    clearRandomFunTimer();
                    setWallpaper(false, false);
                    setWallpaper(properties.customimage.value, true);
                    israndom = false;
                    selectedimg = properties.customimage.value;
                    selectedfolder = '';
                    lastimg = '';
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}
            } else {
                clearAll();
            }
        }

        // Opacity value
        if (properties.opacity) {
            try {
                effects.opacity.value = properties.opacity.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Scale value
        if (properties.scale) {
            try {
                if (properties.scale.value > 0) {
                    effects.scale.value = properties.scale.value / 100;
                    effects.scale.value += effects.scale.baseadd;
                } else {
                    consolemsg(parseError('Scale must be greater than 0'));
                }
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Blur value
        if (properties.blur) {
            try {
                if (properties.blur.value >= 0) {
                    effects.blur.value = properties.blur.value;
                } else {
                    consolemsg(parseError('Blur can\'t be a negative number'));
                }
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Grayscale value
        if (properties.grayscale) {
            try {
                effects.grayscale.value = properties.grayscale.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Brightness value
        if (properties.brightness) {
            try {
                if (properties.brightness.value >= 0) {
                    effects.brightness.value = properties.brightness.value;
                } else {
                    consolemsg(parseError('Brightness can\'t be negative'));
                }
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Contrast value
        if (properties.contrast) {
            try {
                if (properties.contrast.value >= 0) {
                    effects.contrast.value = properties.contrast.value;
                } else {
                    consolemsg(parseError('Contrast can\'t be negative'));
                }
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Saturation value
        if (properties.saturation) {
            try {
                if (properties.saturation.value >= 0) {
                    effects.saturation.value = properties.saturation.value;
                } else {
                    consolemsg(parseError('Saturation can\'t be negative'));
                }
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hue rotation value
        if (properties.huerotate) {
            try {
                effects.huerotate.value = properties.huerotate.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Invert value
        if (properties.invert) {
            try {
                effects.invert.value = properties.invert.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Sepia value
        if (properties.sepia) {
            try {
                effects.sepia.value = properties.sepia.value;
                setWallpaper(selectedimg, true);
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Minute transition
        if (properties.minutes) {
            randomtime = properties.minutes.value * 60000;
            if (randomtime > 0 && israndom) {
                try {
                    clearRandomFunTimer();
                    timedrandomizefun = setInterval(nextRandomImage, randomtime);
                    intervalsetminutesmsg('Randomize thread', randomtime);
                } catch (e) {
                    consolemsg(parseException(e));
                } finally {}
            } else {
                clearRandomFunTimer();
            }
        }

        // Console font color
        if (properties.consolefontcolor) {
            try {
                fontvaluecolor = createRGBColor(properties.consolefontcolor.value);
                if (consolecfg.fontcolor != fontvaluecolor) {
                    consolecfg.fontcolor = fontvaluecolor;
                    consolemsg('Console font color: {0}.'.format(setRgbLineMsg(consolecfg.fontcolor)));
                    $('#consoletext').css('color', consolecfg.fontcolor);
                    $('#author').css('color', 'rgb(255, 255, 255)');
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console background color
        if (properties.consolebgcolor) {
            try {
                consolebgcolor = createRGBColor(properties.consolebgcolor.value);
                if (consolecfg.bgcolor != consolebgcolor) {
                    consolecfg.bgcolor = createRGBColor(properties.consolebgcolor.value);
                    consolemsg('Console background color: {0}.'.format(setRgbLineMsg(consolecfg.bgcolor)));
                    $('#consoletext').css('background-color', consolecfg.bgcolor);
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hide/Unhide console
        if (properties.showconsole) {
            try {
                consolecfg.show = properties.showconsole.value;
                setConsoleStatus();
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Hide/Unhide author
        if (properties.showauthor) {
            try {
                consolecfg.showauthor = properties.showauthor.value;
                setAuthorStatus();
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console opacity
        if (properties.consolealpha) {
            try {
                consolecfg.alpha = properties.consolealpha.value / 100;
                $('#console').css('opacity', consolecfg.alpha);
                consolemsg('Console opacity set to {0}.'.format(consolecfg.alpha));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Console font size
        if (properties.consolefontsize) {
            try {
                if (properties.consolefontsize.value > 0) {
                    consolecfg.fontsize = properties.consolefontsize.value;
                    $('#console').css('font-size', '{0}px'.format(consolecfg.fontsize));
                    consolemsg('Console font-size set to {0}px.'.format(consolecfg.fontsize));
                } else {
                    consolemsg(parseError('Console font size can\'t be lower or equal than zero'));
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        /*
        // Console scale
        if (properties.consolescale) {
            try {
                consolecfg.scale = properties.consolescale.value / 100;
                consoleScale();
                consolemsg('Console scale set to {0}.'.format(consolecfg.scale));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }
		*/

        // Transition style
        if (properties.transitionstyle) {
            try {
                transitioneffect = properties.transitionstyle.value;
                consolemsg("Set '{0}' transition effect.".format(transitioneffect));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Transition duration
        if (properties.transitioneffecttime) {
            try {
                transitionduration = properties.transitioneffecttime.value;
                consolemsg('Set transition duration to {0} ms.'.format(transitionduration));
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }

        // Enable advanced options
        if (properties.advancedoptions) {
            try {
                if (properties.advancedoptions.value) {
                    consolemsg('Advanced options enabled.');
                } else {
                    consolemsg('Advanced options disabled.')
                }
            } catch (e) {
                consolemsg(parseException(e));
            } finally {}
        }
    },
    userDirectoryFilesAddedOrChanged: function(propertyName, changedFiles) {
        if (!files.hasOwnProperty(propertyName)) {
            files[propertyName] = changedFiles;
        } else {
            files[propertyName] = files[propertyName].concat(changedFiles);
        }
        updateFileList('add', files[propertyName]);
    },
    userDirectoryFilesRemoved: function(propertyName, removedFiles) {
        for (var i = 0; i < removedFiles.length; ++i) {
            var index = files[propertyName].indexOf(removedFiles[i]);
            if (index >= 0) {
                files[propertyName].splice(index, 1);
            }
        }
        updateFileList('del', files[propertyName]);
    }
};
