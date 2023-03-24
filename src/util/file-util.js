(function (module, exports, require) {

    exports.FileUtil = {

        /**
         * write file
         * @param {string} path
         * @param {string} value
         */
        write(path, value) {
            const file = new java.io.File(path);

            if (!file.exists()) {
                file.createNewFile();
            }

            const fileWriter = new java.io.FileWriter(file);
            const writer = new java.io.BufferedWriter(fileWriter);

            writer.write(value);

            writer.close();
        },

        /**
         * read file
         * @param {string} path
         */
        read(path) {
            const file = new java.io.File(path);

            if (!file.exists()) {
                throw new Error('No file Exception!');
            }

            const fileReader = new java.io.FileReader(file);
            const reader = new java.io.BufferedReader(fileReader);

            let str;
            let arr = [];
            while ((str = reader.readLine()) != null) {
                arr.push(str);
            }

            return arr.join('\n');
        }

    };

})(module, exports, require);