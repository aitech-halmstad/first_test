/*
 * File: app/view/MyPanel.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.MyPanel', {
    extend: 'Ext.panel.Panel',

    frame: true,
    height: 592,
    width: 1033,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    title: 'Stopp',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    dock: 'right',
                    height: 217,
                    id: 'MyGridPanel',
                    store: 'StopStore',
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 125,
                            dataIndex: 'StoppTidpunkt',
                            text: 'StoppTidpunkt'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 121,
                            dataIndex: 'StartTidpunkt',
                            text: 'StartTidpunkt'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Stopporsak',
                            text: 'Stopporsak'
                        }
                    ],
                    listeners: {
                        select: {
                            fn: me.onGridpanelSelect,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'form',
                    flex: 1,
                    dock: 'top',
                    layout: {
                        type: 'auto'
                    },
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'StoppTid',
                            itemId: 'StoppTid',
                            margin: '5px',
                            value: '2013-02-07',
                            fieldLabel: 'Stopptid',
                            format: 'Y-m-d',
                            startDay: 1
                        },
                        {
                            xtype: 'datefield',
                            id: 'StartTid',
                            itemId: 'StartTid',
                            margin: '5px',
                            fieldLabel: 'Starttid',
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'combobox',
                            margin: '5px',
                            fieldLabel: 'Sektion',
                            displayField: 'name',
                            store: 'PlantStore',
                            valueField: 'id',
                            listeners: {
                                change: {
                                    fn: me.onComboboxChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            margin: '5px',
                            fieldLabel: 'Position',
                            displayField: 'name',
                            store: 'PositionStore',
                            valueField: 'id',
                            listeners: {
                                change: {
                                    fn: me.onComboboxChange1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            margin: '5px',
                            fieldLabel: 'Sub Pos'
                        },
                        {
                            xtype: 'button',
                            margin: '5px',
                            text: 'Sök nya stopp',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    dock: 'bottom',
                    height: 163,
                    itemId: 'detailPanel',
                    tpl: [
                        'Stopptid: {StoppTidpunkt}<br>',
                        'Starttid: {StartTidpunkt}<br>',
                        'Orsak: {Stopporsak}<br>'
                    ],
                    width: 1023,
                    title: 'Details'
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    height: 179,
                    width: 21,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            itemId: 'qualityChart',
                            width: 400,
                            animate: true,
                            insetPadding: 20,
                            store: 'ChartStore',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'name'
                                    ],
                                    position: 'bottom',
                                    title: 'Quality'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'rating'
                                    ],
                                    position: 'left',
                                    title: 'Score',
                                    maximum: 10,
                                    minimum: 0
                                }
                            ],
                            series: [
                                {
                                    type: 'column',
                                    label: {
                                        display: 'insideEnd',
                                        field: 'rating',
                                        color: '#333',
                                        'text-anchor': 'middle'
                                    },
                                    xField: 'name',
                                    yField: [
                                        'rating'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onGridpanelSelect: function(selModel, record, index, options) {
        //Ext.MessageBox.confirm('Please confirm your action', 'Did you really select this?!');



        // grab a reference to the detailPanel via itemId
        // the # in front of the id indicates that we would like to grab a reference by
        var detailPanel = this.child('#detailPanel');
        // update the detailPanel with data
        // this will trigger the tpl to become updates
        detailPanel.update(record.data);

        // grab a reference to the qualityChart, notice we use down here instead of child
        // because down will go down the container hierarchy at any depth and child will
        // only retrieve direct children
        var chart = this.down('#qualityChart');
        // get the quality field out of this record
        var qualityData = record.get('Quality');
        chart.store.loadData(qualityData);
    },

    onComboboxChange: function(field, newValue, oldValue, options) {
        var extraParams = {"parent": newValue, "cmd":"getPositionInfo"};

        Ext.getStore('PositionStore').getProxy().extraParams = extraParams;
        Ext.getStore('PositionStore').load();
    },

    onComboboxChange1: function(field, newValue, oldValue, options) {

    },

    onButtonClick: function(button, e, options) {

        var StoppTid = Ext.Date.format(Ext.getCmp('StoppTid').getValue(), "Y-m-d");
        var StartTid = Ext.Date.format(Ext.getCmp('StartTid').getValue(), "Y-m-d");

        var extraParams = {"StoppTidpunkt": StoppTid, "StartTidpunkt":StartTid};


        //var proxy = Ext.getStore('StopStore').getProxy();
        //proxy.setExtraParams({foo:'bar'});

        Ext.getStore('StopStore').getProxy().extraParams = extraParams;
        Ext.getStore('StopStore').load();

        ///MyApp.store.StopStore.getProxy().setExtraParams(StoppTid);
        //Ext.StopStore.proxy.extraParams = { "StoppTidpunkt":StoppTid }

        //MyApp.store.StopStore.load();
    }

});