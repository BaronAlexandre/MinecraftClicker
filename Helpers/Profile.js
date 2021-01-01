import AsyncStorage from '@react-native-community/async-storage';

class Profile {

    constructor(nom, prenom, age){
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.points = 0;
        this.pickaxe = 0;
        this.ressource = 0;
    }

    increment() {
        this.points++;
        AsyncStorage.setItem("minecraftProfile", JSON.stringify(this));
    }
}

export default Profile