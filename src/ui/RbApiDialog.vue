<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> A RestBundle that provides a mutable <var>apiModel</var> can use
            an <var>RbApiDialog</var> to change all or part of that <var>apiModel</var>.
            Dialogs must be defined in a RestBundle Vue component 
            having the <code>rb-api-mixin</code>,
            which provides methods for editing an <var>apiModelCopy</var> (see <strong>var</strong>).
            You can create different dialogs for the same <var>apiModel</var>, but
            only one dialog can be open at a time. You can also call the <var>rb-api-mixin</var> methods
            directly to change the <var>apiModel</var> programmatically without a dialog
            (e.g., delete an item from the <var>apiModel</var>).
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="apiSvc" value="required" slot="prop">Vue component with rb-api-mixin.</rb-about-item>
        <rb-about-item name="apiDialog" value='"apiDefaultDialog"' slot="prop">
            Name of <var>apiSvc</var> property that toggles dialog visibility. </rb-about-item>
        <rb-about-item name="default" value="required" slot="slot">
            Dialog fields bound to <var>apiModelCopy</var> fields</rb-about-item>
        <rb-about-item name="apiEdit" value='dialog="apiDefaultDialog"' slot="code">
            Application invokes <code>apiEdit()</code> (e.g., via button click)
            to open the named <var>RbApiDialog</var>
            and create <var>apiModelCopy</var>.
            </rb-about-item> 
        <rb-about-item name="apiSave" value="dialog" slot="code">
            When user clicks <strong>Save</strong>, <var>RbApiDialog</var> 
            uses <code>@click="apiSave()"</code> 
            to save updated information on RestBundle server in the <var>api-model</var> folder.
            </rb-about-item>
        <rb-about-item name="apiCancel" value="dialog" slot="code">
            When user cancels dialog, <var>RbApiDialog</var> uses <code>@click="apiCancel()"</code> 
            to close dialog and discard <var>apiModelCopy</var>
            </rb-about-item>
    </rb-about>
    <div v-if="about">
        <v-btn @click.stop='apiSvc[apiDialog] = true'
            primary
            > Example </v-btn>
    </div>
    <v-dialog v-model="apiSvc[apiDialog]" lazy persistent absolute width="90%">
      <v-card >
        <v-toolbar dark flat class="secondary">
            <v-btn icon small hover dark @click.stop='apiCancel()' >
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title><slot name="title">Dialog title</slot></v-toolbar-title>
            <v-spacer/>
            <v-btn v-if="!rbConnected" flat="flat" @click="apiRefresh()">Refresh</v-btn>
            <v-btn v-if="rbConnected" flat="flat" @click="apiSave()">Save</v-btn>
        </v-toolbar>
        <v-card-text class="api-dialog">
            <slot>
                Dialog content goes here (e.g., <code>&lt;v-layout&gt;</code>)
                <v-alert error :value='apiSvc.apiModelCopy == null'><var>apiSvc</var> has no <var>apiModelCopy</var></v-alert>
                <v-text-field v-if='apiSvc && apiSvc.apiModelCopy && apiSvc.apiModelCopy.sampleInput != null' 
                    name="name_sampleInput" id="id_sampleInput"
                    v-model='apiSvc.apiModelCopy.sampleInput' 
                    label="Type something" ></v-text-field>
            </slot>
        </v-card-text>
        <v-card-text v-for="(ae,i) in apiSvc.apiErrors" raised hover class="api-error" :key='i'>
            &#x2639; {{ae.message}}: {{ae.response.data.error}}
        </v-card-text>
        <v-card-text v-if="!rbConnected" raised hover class="api-error">
            &#x2639; Connection lost. Refresh when server is available.
        </v-card-text>
      </v-card>
    </v-dialog>
</div>

</template>
<script>
const Vue = require("vue").default;
class MockApiService {
    constructor() {
        this.apiModelCopy = {};
        this.apiCancel();
    }
    apiRefresh() {
        console.log("apiRefresh");
        window.location.reload();
    }
    apiCancel() {
        console.log("apiCancel");
        this.apiDefaultDialog = false;
        Vue.set(this.apiModelCopy, "sampleInput", 1234);
    }
    apiSave(apiDialog) {
        console.log("apiSave", apiDialog);
        this[apiDialog] = false;
    }
    get rbConnected() {
        return true;
    }
}
var mockSvc = new MockApiService();

export default {
    name: "RbApiDialog",
    props: {
        apiSvc: {
            default: () => mockSvc,
        },
        apiDialog: {
            default: 'apiDefaultDialog',
        },
    },
    methods: {
        apiRefresh() {
            return this.apiSvc.apiRefresh();
        },
        apiSave() {
            return this.apiSvc.apiSave(this.apiDialog);
        },
        apiCancel() {
            return this.apiSvc.apiCancel(this.apiDialog);
        },
    },
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
    ],
    computed: {
        rbConnected() {
            return this.apiSvc.rbConnected;
        },
    },
    data() {
        return {
        }
    },
}

</script>
<style> 
.api-error {
    color: white;
    background-color: #b71c1c;
    border-top: 1pt solid #fff;
    font-size: 110%;
}
.api-dialog {
}
.api-dialog .input-group {
    background-color: #fff;
    margin-bottom: 0;
}
.api-dialog .layout+.layout {
    margin-top: 9px;
}
</style>

