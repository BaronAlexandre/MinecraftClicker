class Profile {

    constructor(nom, prenom, age){
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.points = 0;
        this.multiplicateur = 0;
        this.pointsByClic = 0;
    }

    increment() {
        this.points++;
    }
}

export default Profile