<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class AdminController extends Controller
{
    function addOrUpdateProduct(Request $request, $id = "add"){
        if($id == "add"){
            $product = new Product;
        }else{
            $product = Product::find($id);
        }

        $product->title = $request->title;
        $product->price = $request->price;
        $product->qty = $request->qty;
        $product->brand_id = $request->brand_id;
        $product->screen = $request->screen;
        $product->battery = $request->battery;
        $product->description = $request->description;
        $product->image = $request->description;
        $product->save();

        return json_encode(["product" => $product]);
    }

    function findProduct(Request $request){
        $product = Product::find($request->product_id);
        return json_encode(["product" => $product]);
    }
}
