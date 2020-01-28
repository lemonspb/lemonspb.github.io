
    const user = {
    id: 20,
    name: "John Dow",
    role: "QA",
    salary: 100
    };
    
    const apiTemplatesSet1 = [
    "/api/items/%id%/%name%",
    "/api/items/%id%/%role%",
    "/api/items/%id%/%salary%"
    ];
    
    const apiPathes = apiTemplatesSet1.map(apiPathTemplate => {
    return getApiPath(user, apiPathTemplate);
    });
    
        function getApiPath(obj, template) {
            let path = template.replace(/%(.*?)%/g,(a, b) => {
                console.log(a,b)
              return obj[b];
            });
            return path;
          }
             console.log(JSON.stringify(apiPathes));