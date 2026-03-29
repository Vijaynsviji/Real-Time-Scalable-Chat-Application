

export function changeTheme(theme:'dark' | 'light'){
    if(theme=='light'){
        document.documentElement.style.setProperty('--text-color', 'rgb(10, 10, 10)');
        document.documentElement.style.setProperty('--bg-color', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--dark-light-color', 'rgb(250, 250, 250)');
        document.documentElement.style.setProperty('--light-dark-color', "rgb(23, 23, 23)")
    }else{
        document.documentElement.style.setProperty('--text-color', 'rgb(10, 10, 10)');
        document.documentElement.style.setProperty('--bg-color', 'rgb(250, 250, 250)');
        document.documentElement.style.setProperty('--dark-light-color', 'rgb(38, 38, 38)');
        document.documentElement.style.setProperty('--light-dark-color', "rgb(229, 229, 229)")
    }
}