<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays web socket connection status. Refreshing page after lost connection
            will restore connecdtion if server is active. 
            Clicking icon opens Server Settings dialog.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div class='rbws-example' v-if="about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.stop="apiEdit()">
            <v-icon :class="rbwsBtnClass" small>settings_ethernet</v-icon>
        </v-btn>
    </div>
    <div class="rbws-container" v-if="!about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.stop="apiEdit()">
            <v-icon :class="rbwsBtnClass" small>settings_ethernet</v-icon>
        </v-btn>
    </div>
    <rb-api-dialog :apiSvc='this' v-if="apiModelCopy">
        <span slot="title">RestBundle Server Settings</span>
        <rb-dialog-row >
            <div v-tooltip:right='{html:"Web socket messages received"}' slot="label">
                Received</div>
            <div class="rb-dialog-row-text">{{pushCount}}</div>
        </rb-dialog-row>
        <rb-dialog-row label="Push interval">
            <v-text-field label="Milliseconds" v-model='apiModelCopy.pushStateMillis' 
                :rules="[apiRules.required, apiRules.gt0]">
            </v-text-field>
        </rb-dialog-row>
    </rb-api-dialog>
    <v-dialog v-model="showRefresh" lazy persistent absolute  width='60%'>
        <v-card>
            <v-toolbar dark class="error">
                <v-toolbar-title >
                    Lost server connection
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="subheading">
                Click <strong>Refresh</strong> when server is available.
            </v-card-text>
            <v-toolbar>
                <v-spacer/>
                <v-btn flat error
                    hover
                    @click.stop="apiRefresh()">Refresh</v-btn>
            </v-toolbar>
        </v-card>
    </v-dialog>
</div>

</template>
<script>
const Vue = require("vue").default;

export default {
    name: "RbWebSocket",
    props: {
        service: { // override mixin with immutable property
            default: "RbServer",
            validator: (value) => value === "RbServer", 
        },
    },
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-api-mixin.js").createMixin("web-socket"),
    ],
    methods: {
        wsOnMessage(event) {
            var ed = JSON.parse(event.data);
            if (ed.type === 'state') {
                var state = ed.data;
                Object.keys(state).forEach((service) => {
                    var serviceModule = this.$store._modules.get(["restBundle", service]);
                    var context = serviceModule && serviceModule.context;
                    context && context.commit("update", state[service]);
                });
            } else {
                console.warn("Ignoring web socket message:", ed);
            }
        },
    },
    computed: {
        rbwsBtnClass() {
            var c = '';
            if (this.rbConnected) {
                c += 'grey darken-4 green--text'
                c += (this.pushCount % 2) ? ' text--darken-1' : ' text--lighten-2';
            } else {
                c += 'red white--text';
            }
            return c;
        },
        showRefresh() {
            return this.rbConnected === false;
        },
    },
    data() {
        return {
            webSocket: this.webSocket,
            apiRules: {
                required: (value) => !!value || 'Required',
                gt0: (value) => Number(value) > 0 || 'Positive number',
            },
        }
    },
    created() {
        try {
            var wsurl = this.restOrigin().replace(/[^:]*/, 'ws');
            this.webSocket = new WebSocket(wsurl);
            this.webSocket.onmessage = this.wsOnMessage;
            this.webSocket.onopen = (event) => {
                this.rbCommit({
                    rbConnected: true,
                });
            }
            this.webSocket.onclose = (event) => {
                this.rbCommit({
                    rbConnected: false,
                });
            }
        } catch (err) {
            console.log("Could not open web socket", err);
        }
    },
    beforeMount() {
        this.apiLoad();
    },
    components: {
    }
}

</script>
<style> 
.form-table th {
    vertical-align: top;
    text-align: left;
    padding-right: 1em;
}
.form-table td {
    vertical-align: top;
    padding-bottom: 3pt;
}
</style>

