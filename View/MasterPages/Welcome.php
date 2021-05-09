<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>ESP Image Processor</title>
    <link rel="stylesheet" type="text/css" href="./View/CSS/secondcss.css">
    <link rel="stylesheet" type="text/css" href="./View/CSS/firstcss.css">
    <link rel="stylesheet" type="text/css" href="./View/CSS/btech.css">
</head>


<body>
    <div class="row">
        <div class="col-sm-12">
            <div class="alert alert-success {{ success }}" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h5>Image resized successfuly.</h5>
            </div>
            <div class="alert alert-danger {{ failure }}" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h5>{{ feedback }}</h5>
            </div>
            <section id="intro-header">
                <div class="wrap-headline">
                    <h1 class="text-center">ESP Image Processor</h1>
                    <h4 class="text-center danger">Resize and Crop images in PHP</h4>
                    <h4 class="text-center danger">Developped by Ruphin Lobanga (ruphiny2j@gmail.com)</h4>
                    <hr>

                    <section id="newsletter" class="text-center">

                        <h4>Select your image & Resize !</h4>

                        <form class="col-sm-offset-4 col-sm-4" method="POST" action="index.php"
                            enctype="multipart/form-data">
                            
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="customRadio" name="crop_option"
                                        value="products" checked>
                                    <label class="custom-control-label text-white" for="customRadio">Product images</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="customRadio2" name="crop_option"
                                        value="staff">
                                    <label class="custom-control-label text-white" for="customRadio2">Staff members images</label>
                                </div>
                            
                            <div class="form-group">
                                <input type="file" class="file form-control" name="image_to_resize">
                            </div>

                            <input type="hidden" name="controller" value="resizeImage">
                            <button type="submit" class="btn btn-warning">Resize</button>
                        </form>

                    </section>

                </div>

            </section>

        </div>
    </div>

    <script src="./View/Javascript/jquery-3.2.1.js"></script>
    <script src="./View/Javascript/bootjs/bootstrap.js"></script>
    <script src="./View/Javascript/PageWelcome.js"></script>
</body>

</html>