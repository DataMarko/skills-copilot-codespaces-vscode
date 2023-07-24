function skillsMember() {
    return {
        name: 'Skills Member',
        template: `
            <div>
                <h3>Skills Member</h3>
                <ul>
                    <li v-for="skill in skills">{{ skill }}</li>
                </ul>
            </div>
        `,
        data() {
            return {
                skills: ['VueJS', 'ReactJS', 'AngularJS', 'EmberJS', 'BackboneJS']
            }
        }
    }
}