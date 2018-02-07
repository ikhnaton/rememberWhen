const config = {
    "cloudantNoSQLDB": [
        {
            "credentials": {
                "username": "c12a1260-f5c6-4c96-9f8e-dcd34cf47478-bluemix",
                "password": "126229f6f80117deb858392fd779e6b00b16510044aa9940886f912664cc1d88",
                "host": "c12a1260-f5c6-4c96-9f8e-dcd34cf47478-bluemix.cloudant.com",
                "port": 443,
                "url": "https://c12a1260-f5c6-4c96-9f8e-dcd34cf47478-bluemix:126229f6f80117deb858392fd779e6b00b16510044aa9940886f912664cc1d88@c12a1260-f5c6-4c96-9f8e-dcd34cf47478-bluemix.cloudant.com"
            },
            "syslog_drain_url": null,
            "label": "cloudantNoSQLDB",
            "provider": null,
            "plan": "Lite",
            "name": "Cloudant Ninja",
            "tags": [
                "data_management",
                "ibm_created",
                "lite",
                "ibm_dedicated_public"
            ]
        }
    ]
}

module.exports = config
