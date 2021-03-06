import React, {Component} from 'react';

import {observer} from 'mobx-react';
import {autoSubscriber} from 'firebase-nest';

class DinosaurDetail extends Component {
    static getSubs(props, state) {
        const {store, dinosaurKey} = props;
        return store.dinosaurDetailAndScoreSubs(dinosaurKey);

        //NOTE: any observable values that are used here must also be used in render()!
        //This ensures the component will be re-rendered when those values change
        // and will therefore update its subs
    }
    static subscribeSubs(subs, props, state) {
        const {store} = props;
        return store.subscribeSubs(subs);
    }

    renderField(field, val) {
        return (
            <div key={field}>
                {field}: {JSON.stringify(val)}
            </div>
        );
    }

    render() {
        const {store, dinosaurKey} = this.props;

        const detail = store.detail(dinosaurKey);

        if (!detail) {
            return <div>Loading detail...</div>;
        }

        const score = store.score(dinosaurKey);

        return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <h3>{dinosaurKey}</h3>
                {score !== undefined && <div>Score: {score}</div>}
                <div>{detail.entries().map(entry => this.renderField(entry[0], entry[1]))}</div>
            </div>
        );
    }
}

export default autoSubscriber(observer(DinosaurDetail));
